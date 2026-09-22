"use client";

import React, { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Environment, Html, OrbitControls, useTexture } from "@react-three/drei";
import type { Project } from "@/types";
import { PROJECTS } from "@/content/projects/projects";
import { useCardContext } from "./card-context";

// Preload semua gambar project sesegera mungkin agar tidak telat muncul di model 3D
PROJECTS.forEach((project) => {
  useTexture.preload(project.imageUrl);
});

type CardPosition = {
  x: number;
  y: number;
  z: number;
};

const CARD_WIDTH = 4.5;
const CARD_HEIGHT = 6;
const IMAGE_WIDTH = CARD_WIDTH - 0.3;
const IMAGE_HEIGHT = 4.0;
const CARD_PADDING = 0.1;
const IMAGE_Y = CARD_HEIGHT / 2 - IMAGE_HEIGHT / 2 - CARD_PADDING;

function CardImageMesh({
  url,
  opacity,
}: {
  url: string;
  opacity: number;
}) {
  const texture = useTexture(url);
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 16;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  return (
    <mesh position={[0, IMAGE_Y, 0.02]}>
      <planeGeometry args={[IMAGE_WIDTH, IMAGE_HEIGHT]} />
      <meshBasicMaterial map={texture} transparent opacity={opacity} />
    </mesh>
  );
}

function FloatingCard({
  project,
  position,
}: {
  project: Project;
  position: CardPosition;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { setSelectedProject, selectedProject, isModalOpen } = useCardContext();

  const isThisCardActive = selectedProject?.id === project.id;
  const shouldFade = isModalOpen && !isThisCardActive;
  const fadeOpacity = shouldFade ? 0.08 : 1;
  const borderMaterialRef = useRef<THREE.MeshBasicMaterial>(null);

  // Offset acak agar setiap kartu melayang dengan ritme yang berbeda
  const randomOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ camera, clock }) => {
    if (groupRef.current) {
      groupRef.current.lookAt(camera.position);
      // Efek melayang naik turun (bobbing)
      groupRef.current.position.y = position.y + Math.sin(clock.getElapsedTime() * 1.5 + randomOffset) * 0.4;
    }

    // Efek warna cahaya pinggiran kartu yang berubah-ubah seiring waktu
    if (borderMaterialRef.current) {
      if (!hovered && !shouldFade) {
        // Mengubah warna Hue dari 0.0 hingga 1.0 (seperti pelangi / RGB)
        // Offset acak memastikan setiap kartu memiliki warna yang berbeda pada saat yang sama
        const hue = (clock.getElapsedTime() * 0.15 + randomOffset) % 1;
        borderMaterialRef.current.color.setHSL(hue, 0.7, 0.5);
      } else if (hovered) {
        borderMaterialRef.current.color.setHex(0x4a7c59); // Kembali ke warna aksen (hijau) saat dursor berada di atasnya
      } else {
        borderMaterialRef.current.color.setHex(0x2a2a2a); // Meredup warna gelap jika kartu lain sedang di-klik (fade)
      }
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (shouldFade) return;
    setSelectedProject(project);
  };

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (shouldFade) return;
    setHovered(true);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(false);
    document.body.style.cursor = "auto";
  };

  return (
    <group
      ref={groupRef}
      position={[position.x, position.y, position.z]}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* Border plane — slightly larger, sits behind the card */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[CARD_WIDTH + 0.06, CARD_HEIGHT + 0.06]} />
        <meshBasicMaterial
          ref={borderMaterialRef}
          transparent
          opacity={shouldFade ? 0.05 : hovered ? 0.7 : 0.25}
        />
      </mesh>

      {/* Card background — always renders dark, so no white flash */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[CARD_WIDTH, CARD_HEIGHT]} />
        <meshBasicMaterial
          color="#1F2121"
          transparent
          opacity={fadeOpacity}
        />
      </mesh>

      {/* Image mesh — suspends only itself while texture loads */}
      <Suspense fallback={null}>
        <CardImageMesh url={project.imageUrl} opacity={fadeOpacity} />
      </Suspense>

      {/* Title + category as DOM text */}
      <Html
        position={[0, -(CARD_HEIGHT / 2) + 0.7, 0.02]}
        center
        distanceFactor={12}
        zIndexRange={[1, 10]}
        occlude={false}
        style={{
          pointerEvents: "none",
          opacity: shouldFade ? 0.08 : 1,
          transition: "opacity 0.4s ease",
          whiteSpace: "nowrap",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: "13px",
              fontWeight: 700,
              fontFamily: "var(--font-display, sans-serif)",
              letterSpacing: "0.01em",
            }}
          >
            {project.title}
          </div>
          <div
            style={{
              color: "#6BA37A",
              fontSize: "9px",
              fontFamily: "var(--font-mono, monospace)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginTop: "2px",
            }}
          >
            {project.category}
          </div>
        </div>
      </Html>

      {hovered && !shouldFade ? (
        <pointLight
          position={[0, 0, 2]}
          color="#4A7C59"
          intensity={0.8}
          distance={5}
        />
      ) : null}
    </group>
  );
}

function IntroAnim() {
  useFrame((state) => {
    // Mempercepat animasi zoom awal (0.08) agar model langsung terlihat jelas saat diakses
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 24, 0.08);
  });
  return null;
}

function CardGalaxy() {
  const { projects } = useCardContext();

  const positions = useMemo<CardPosition[]>(() => {
    const result: CardPosition[] = [];
    const n = Math.max(projects.length, 1);
    const golden = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < n; i++) {
      const y = 1 - (i / Math.max(n - 1, 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = (2 * Math.PI * i) / golden;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      const layerRadius = 9 + (i % 3) * 2;

      result.push({
        x: x * layerRadius,
        y: y * layerRadius,
        z: z * layerRadius,
      });
    }
    return result;
  }, [projects.length]);

  return (
    <>
      {projects.map((project, i) => (
        <Suspense fallback={null} key={project.id}>
          <FloatingCard project={project} position={positions[i]} />
        </Suspense>
      ))}
    </>
  );
}

export default function StellarCardGallery() {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        overflow: "hidden",
        touchAction: "pan-y",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 40], fov: 55 }}
        style={{ width: "100%", height: "100%", display: "block", touchAction: "pan-y" }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        dpr={prefersReducedMotion ? 1 : [1, 1.5]}
        onCreated={({ gl }) => {
          gl.domElement.style.setProperty("touch-action", "pan-y", "important");
          gl.domElement.style.pointerEvents = "auto";
          if (typeof window !== "undefined") {
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          }
        }}
      >
        <IntroAnim />
        <Suspense fallback={null}>
          <Environment preset="night" />
        </Suspense>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.6} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        <CardGalaxy />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate
          autoRotate={!prefersReducedMotion}
          autoRotateSpeed={3.5}
          minDistance={5}
          maxDistance={40}
          rotateSpeed={0.5}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}
