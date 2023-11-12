"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

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

interface SelectorProps {
  Title: string;
  Subtext: string;
  link: string;
  Dir: "left" | "right" | "up" | "down";
  ImageDir?: string;
  ModelDir?: string;
  root?: boolean;
}

export default function Selector(props: SelectorProps) {
  const directionClassNames: Record<SelectorProps["Dir"], string> = {
    left: "group-hover:translate-x-[-0.75rem]",
    right: "group-hover:translate-x-[0.75rem]",
    up: "group-hover:translate-y-[-0.75rem]",
    down: "group-hover:translate-y-[0.75rem]",
  };

  //determine if this button links to the page we're on
  var path = usePathname();
  const tar = props.link.replace(/\\/g, "/");
  var test;
  props.root ? (test = path.includes(tar)) : (test = path == tar);

  //const test = path === tar;

  return (
    <Link
      href={test ? "" : props.link}
      scroll={false}
      className={`group rounded-lg border border-transparent max-w-[11vw] min-w-fit px-5 py-4 ${
        test
          ? "dark:border-neutral-700 bg-neutral-800/30"
          : " hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      }`}
    >
      <span
        className={`inline-block transition-transform ${
          directionClassNames[props.Dir]
        } motion-reduce:transform-none`}
      >
        <h2 className={`mb-3 text-2xl font-semibold`}>{props.Title} </h2>
        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>{props.Subtext}</p>
      </span>
    </Link>
  );
}

export function ComplexSelector(props: SelectorProps) {
  const directionClassNames: Record<SelectorProps["Dir"], string> = {
    left: "group-hover:translate-x-[-0.75rem]",
    right: "group-hover:translate-x-[0.75rem]",
    up: "group-hover:translate-y-[-0.75rem]",
    down: "group-hover:translate-y-[0.75rem]",
  };

  //determine if this button links to the page we're on
  const path = usePathname();
  const tar = props.link.replace(/\\/g, "/");
  const test = path === tar;

  //----Model setup stuff----
  var SubjectObj = () => {
    return <div></div>;
  };
  if (props.ModelDir) {
    SubjectObj = () => {
      const { camera } = useThree();
      const gltf = useLoader(GLTFLoader, props.ModelDir!);
      const meshRef = useRef<Mesh>(null!);
      useFrame((state, delta) => {
        camera.lookAt(0, 0, 0);
        camera.far = 5000.0;
        camera.updateProjectionMatrix();
        camera.position.x = Math.sin(0) * -4.0;
        camera.position.z = Math.cos(0) * -4.0;
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
  }
  //----End of Model Stuff----

  return (
    <span className="">
      <Link
        href={props.link}
        scroll={false}
        className={`inline-block group rounded-lg border border-transparent px-5 py-4 ${
          test
            ? "dark:border-neutral-700 bg-neutral-800/30"
            : " hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        }`}
      >
        {props.ImageDir ? (
          <>
            <Image
              src={props.ImageDir}
              height={0}
              width={0}
              alt=""
              sizes="(width: auto) (height: 200px)"
              quality={10}
              style={{ width: "auto", height: "100px", borderRadius: "10px" }}
            />
          </>
        ) : (
          <>
            <></>
          </>
        )}
        {props.ModelDir ? (
          <>
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
          </>
        ) : (
          <>
            <></>
          </>
        )}
        <div
          className={`inline-block transition-transform ${
            directionClassNames[props.Dir]
          } motion-reduce:transform-none`}
        >
          <h2 className={`text-2xl font-semibold`}>{props.Title} </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            {props.Subtext}
          </p>
        </div>
      </Link>
    </span>
  );
}
