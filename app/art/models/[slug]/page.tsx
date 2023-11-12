"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import React, { useRef } from "react";
import {
  Color,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
} from "three/src/Three.js";
import { ObjectLockLegalHoldStatus } from "@aws-sdk/client-s3";

export default async function modelPg({
  params,
}: {
  params: { slug: string };
}) {
  var SubjectObj = () => {
    return <div></div>;
  };
  SubjectObj = () => {
    const { camera } = useThree();
    const gltf = useLoader(GLTFLoader, `/models/archive/${params.slug}.gltf`);
    const meshRef = useRef<Mesh>(null!);
    useFrame((state, delta) => {
      camera.lookAt(0, 0, 0);
      camera.far = 5000.0;
      camera.updateProjectionMatrix();
      camera.position.x = Math.sin(0) * -6.0;
      camera.position.z = Math.cos(0) * -6.0;
      camera.position.y = 2.0;

      meshRef.current.rotation.y += 0.001;
      meshRef.current.rotation.z = 0;
      //meshRef.current.position.x = -roll * 5;
    });
    return (
      <>
        <primitive
          object={gltf.scene}
          scale={0.3}
          position={[0, 0, 0]}
          rotation={[0, 3.14, 0]}
          ref={meshRef}
        />
      </>
    );
  };

  return (
    <div>
      <div className="flex relative items-center justify-center w-auto h-[calc(100vh-400px)] overflow-hidden -z-10">
        <Suspense fallback="Loading...">
          <Canvas
            camera={{
              position: [0, 0, 0],
              rotation: [0.0, 0, 0],
              isPerspectiveCamera: true,
            }}
          >
            <SubjectObj />
            <ambientLight args={[0xff0000]} intensity={0.0} />
            <directionalLight position={[0, 2, 1]} intensity={3} />
          </Canvas>
        </Suspense>
      </div>
    </div>
  );
}
