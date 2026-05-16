Fix these issues and update all dependencies to latest stable versions:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FIX 1 — Remove the black wireframe globe spheres
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

In CardGalaxy component, find and DELETE all <Sphere> elements entirely:

DELETE these (all 4 of them):
  <Sphere args={[2, 32, 32]} position={[0, 0, 0]}>
    <meshStandardMaterial color="#1a1a2e" transparent opacity={0.15} wireframe />
  </Sphere>
  <Sphere args={[12, 32, 32]} position={[0, 0, 0]}>
    <meshStandardMaterial color="#4A7C59" transparent opacity={0.05} wireframe />
  </Sphere>
  <Sphere args={[16, 32, 32]} position={[0, 0, 0]}>
    <meshStandardMaterial color="#4A7C59" transparent opacity={0.03} wireframe />
  </Sphere>
  <Sphere args={[20, 32, 32]} position={[0, 0, 0]}>
    <meshStandardMaterial color="#4A7C59" transparent opacity={0.02} wireframe />
  </Sphere>

Also remove Sphere from the drei imports if it's no longer used elsewhere.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FIX 2 — White box artifact on cards
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The white box appears because:
a) planeGeometry card background renders white before texture loads
b) edgesGeometry/lineSegments can cause rendering artifacts

Fix A — Card background mesh: ensure it never flashes white:
  <mesh position={[0, 0, 0]}>
    <planeGeometry args={[cardWidth, cardHeight]} />
    <meshBasicMaterial 
      color="#1F2121"
      transparent
      opacity={shouldFade ? 0.08 : 1}
    />
  </mesh>

Fix B — Wrap texture mesh in a Suspense with a dark fallback:
  // Create a fallback dark plane shown while texture loads
  function CardImageMesh({ texture, width, height, opacity }) {
    return (
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} transparent opacity={opacity} />
      </mesh>
    )
  }

  // In FloatingCard, use Suspense around the texture mesh:
  // The parent card background (#1F2121) shows while texture loads
  // so there's never a white flash

Fix C — Replace lineSegments/edgesGeometry border (causes white artifact) 
with a slightly larger dark plane behind the card for the border effect:

  REMOVE this entirely:
    <lineSegments>
      <edgesGeometry ... />
      <lineBasicMaterial ... />
    </lineSegments>

  REPLACE with a border using a slightly larger background plane:
    {/* Border plane — slightly larger than card, behind it */}
    <mesh position={[0, 0, -0.01]}>
      <planeGeometry args={[cardWidth + 0.06, cardHeight + 0.06]} />
      <meshBasicMaterial 
        color={hovered ? "#4A7C59" : "#2a2a2a"}
        transparent
        opacity={shouldFade ? 0.05 : (hovered ? 0.7 : 0.25)}
      />
    </mesh>

Fix D — useTexture must be wrapped in Suspense at the FloatingCard level.
If useTexture throws while loading, it shows white. Ensure FloatingCard 
is wrapped in <Suspense fallback={null}> in CardGalaxy:

  {cards.map((card, i) => (
    <Suspense fallback={null} key={card.id}>
      <FloatingCard card={card} position={cardPositions[i]} />
    </Suspense>
  ))}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FIX 3 — Update all dependencies to latest stable (security patches)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Run these commands in order:

  # 1. Check what's outdated and vulnerable
  npm audit
  npm outdated

  # 2. Update Next.js to latest stable
  npm install next@latest react@latest react-dom@latest

  # 3. Update Three.js ecosystem
  npm install three@latest @react-three/fiber@latest @react-three/drei@latest

  # 4. Update TypeScript types
  npm install --save-dev @types/three@latest @types/react@latest @types/node@latest typescript@latest

  # 5. Update Tailwind and tooling
  npm install --save-dev tailwindcss@latest postcss@latest autoprefixer@latest

  # 6. Fix any remaining vulnerabilities
  npm audit fix

  # 7. Confirm no breaking changes
  npm run build

If npm run build fails after updates, show me the exact error output.

Common breaking change to watch for after @react-three/fiber update:
  - If Canvas props changed, check migration guide
  - If useTexture signature changed, it still accepts string | string[]
  - If drei Html component props changed, distanceFactor is still valid

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
After fixes: no globe, no white boxes, no npm vulnerabilities.
Run npm audit at the end and confirm 0 critical/high vulnerabilities.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━