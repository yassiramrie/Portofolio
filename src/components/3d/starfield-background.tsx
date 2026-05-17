"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function StarfieldBackground({
  className = "",
}: {
  className?: string;
}) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 1);
    mount.appendChild(renderer.domElement);

    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 10000;
    const positions = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
    }
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.7,
      sizeAttenuation: true,
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
    camera.position.z = 10;

    // Jejak bintang (Stardust trail) yang mengikuti kursor
    const trailCount = 40;
    const trailGeometry = new THREE.BufferGeometry();
    const trailPositions = new Float32Array(trailCount * 3);
    for (let i = 0; i < trailCount * 3; i++) trailPositions[i] = 10000; // Sembunyikan jauh saat pertama dirender
    trailGeometry.setAttribute("position", new THREE.BufferAttribute(trailPositions, 3));
    const trailMaterial = new THREE.PointsMaterial({
      color: 0x6ba37a, // Warna kehijauan (tema portofolio)
      size: 1.5,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });
    const trail = new THREE.Points(trailGeometry, trailMaterial);
    scene.add(trail);

    // Menyimpan posisi kursor untuk efek pergerakan kosmik
    let targetX = 0;
    let targetY = 0;
    const mouse3D = new THREE.Vector3(0, 0, 10000);
    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
      
      // Kalkulasi proyeksi 3D kursor
      const vec = new THREE.Vector3((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1, 0.5);
      vec.unproject(camera);
      vec.sub(camera.position).normalize();
      const distance = -camera.position.z / vec.z;
      mouse3D.copy(camera.position).add(vec.multiplyScalar(distance));
    };
    window.addEventListener("mousemove", onMouseMove);

    let animationId = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      stars.rotation.y += 0.0001;
      stars.rotation.x += 0.00005;
      // Rotasi dasar ditambah dengan arah pergerakan kursor
      stars.rotation.y += 0.0001 + targetX * 0.001;
      stars.rotation.x += 0.00005 + targetY * 0.001;

      // Update partikel jejak satu persatu
      const positions = trailGeometry.attributes.position.array as Float32Array;
      for (let i = trailCount - 1; i > 0; i--) {
        positions[i * 3] = positions[(i - 1) * 3];
        positions[i * 3 + 1] = positions[(i - 1) * 3 + 1];
        positions[i * 3 + 2] = positions[(i - 1) * 3 + 2];
      }
      positions[0] = mouse3D.x;
      positions[1] = mouse3D.y;
      positions[2] = mouse3D.z;
      trailGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationId);
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      starsGeometry.dispose();
      starsMaterial.dispose();
      trailGeometry.dispose();
      trailMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={className}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        backgroundColor: "#000",
        pointerEvents: "none",
      }}
      aria-hidden
    />
  );
}
