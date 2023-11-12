"use client";
import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three/src/math/Vector3.js";
import styles from "./glider.module.css";
import {
  Color,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
} from "three/src/Three.js";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { Suspense } from "react";
import THREE from "three";

import terrainFrag from "./gliderTech/simTerrainFragment.glsl";
import terrainVert from "./gliderTech/simTerrainVertex.glsl";
import sky from "./gliderTech/sky.glsl";
import { vec3 } from "three/examples/jsm/nodes/Nodes.js";

var pA = false;
var pD = false;

var leftAcc = 0;
var rightAcc = 0;

var roll = 0;
var yaw = 0;

var localPosition = { x: 0, y: 0, z: 0 };

var globalTime = 0;

const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;
const clamp = (a: number, min = 0, max = 1) => Math.min(max, Math.max(min, a));

try {
  document.addEventListener("keydown", function (event) {
    if (event.key === "a") {
      pA = true;
    }
    if (event.key === "d") {
      pD = true;
    }
  });

  document.addEventListener("keyup", function (event) {
    if (event.key === "a") {
      pA = false;
    }
    if (event.key === "d") {
      pD = false;
    }
  });
} catch {}

export default function glider() {
  const BG = () => {
    const { camera } = useThree();
    const Mat = useRef<THREE.ShaderMaterial>(null!);
    const Backdrop = useRef<Mesh>(null!);

    useFrame((state, delta) => {
      Mat.current.uniforms.u_time = {
        value: globalTime,
      };
      Mat.current.uniforms.yaw = {
        value: yaw,
      };
    });

    return (
      <>
        <mesh
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={1000}
          ref={Backdrop}
        >
          <sphereGeometry args={[5, 12, 12]} />
          <shaderMaterial
            ref={Mat}
            transparent={false}
            side={1}
            fragmentShader={sky.skyFrag as string}
            vertexShader={sky.skyVert as string}
          />
        </mesh>
      </>
    );
  };

  const Plane = () => {
    const { camera } = useThree();
    const gltf = useLoader(GLTFLoader, "/models/games/glider/glider.gltf");
    const meshRef = useRef<Mesh>(null!);
    useFrame((state, delta) => {
      if (pA) {
        leftAcc += 0.00003;
      } else {
        leftAcc -= 0.00003;
      }
      if (pD) {
        rightAcc += 0.00003;
      } else {
        rightAcc -= 0.00003;
      }

      leftAcc = clamp(leftAcc, 0, 0.01);
      rightAcc = clamp(rightAcc, 0, 0.01);

      roll += -leftAcc + rightAcc;
      roll -= roll / 60;

      yaw -= roll / 200;
      camera.lookAt(0, 0, 0);
      camera.far = 5000.0;
      camera.updateProjectionMatrix();
      camera.position.x = Math.sin(yaw) * -8.0;
      camera.position.z = Math.cos(yaw) * -8.0;
      camera.position.y = 1.0;

      meshRef.current.rotation.z = roll;
      meshRef.current.rotation.y = yaw;
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

  const Terrain = () => {
    const terMesh = useRef<Mesh>(null!);
    const Mat = useRef<THREE.ShaderMaterial>(null!);

    var time = 1;
    useFrame((state, delta) => {
      globalTime = state.clock.getElapsedTime() / 10.0;
      localPosition.x += Math.sin(yaw) * 1.2;
      localPosition.y -= Math.cos(yaw) * 1.2;
      //terMesh.current.rotation.z += 0.01;
      time = state.clock.getDelta() * 0.1;
      Mat.current.uniforms.u_time = {
        value: globalTime,
      };
      Mat.current.uniforms.yaw = { value: -yaw };
      Mat.current.uniforms.runningPos = {
        value: [localPosition.x, localPosition.y, 0],
      };
    });

    return (
      <>
        <mesh
          ref={terMesh}
          position={[0, -100, 0]}
          rotation={[-1.57, 0, 0]}
          scale={1}
        >
          <planeGeometry args={[10000, 10000, 1000, 1000]} />
          <shaderMaterial
            ref={Mat}
            transparent={true}
            fragmentShader={terrainFrag as any}
            vertexShader={terrainVert as any}
          />
        </mesh>

        <mesh position={[0, -150, 0]} rotation={[-1.57, 0, 0]} scale={1}>
          <planeGeometry args={[3000, 3000, 1, 1]} />
          <meshPhongMaterial color={[0, 0.1, 0.2]} />
        </mesh>
      </>
    );
  };

  return (
    <div className="flex items-center justify-center min-h-[48vh]">
      <div className={styles.canv}>
        <Canvas
          camera={{
            position: [0, 0, 0],
            rotation: [0.0, 0, 0],
            isPerspectiveCamera: true,
          }}
        >
          <Suspense fallback={null}>
            <Plane />
            <Terrain />
            <fog attach="fog" color="white" near={1} far={3000} />
            <ambientLight args={[0xff0000]} intensity={0.0} />
            <directionalLight position={[0, 2, 1]} intensity={3} />
            <BG />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
