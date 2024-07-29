import React, { useState } from 'react';
import { Canvas,useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import css from "../styles/Scene.module.css";
import ShapeFromPoints from "./ShapeFromPoints";
import { useGLTF, AccumulativeShadows, RandomizedLight, Edges, Outlines, Environment } from "@react-three/drei"

// Define your Canvas class component here
interface CanvasProps {
    elements: Array<React.ReactElement>; // Array of elements to render
    height: number;
}



const KriCanvas: React.FC<CanvasProps> = ({ elements, height  }) => {

    return (
        <Canvas
            shadows
            className={css.canvas}
            camera={{
                fov: 100, near: 5, far: 10000,
                position: [0, 200, 200],
            }}

        >

            {elements.map((element, index) => (
                <React.Fragment key={index}>{element}</React.Fragment>
            ))}
            <OrbitControls/>

            <ambientLight color={"white"} intensity={1}/>
            <directionalLight
                castShadow receiveShadow intensity={1} position={[30, 30, 50]}
                shadow-normalBias={0.1}
                shadow-camera-left={-12}
                shadow-camera-right={12}
                shadow-camera-top={12}
                shadow-camera-bottom={-12}
                shadow-camera-near={0.5}
                shadow-camera-far={200}
            />

            <spotLight intensity={Math.PI} decay={0} angle={0.2} castShadow position={[5, 2.5, 5]}
                       shadow-mapSize={128}/>
            <AccumulativeShadows frames={100} temporal>
                <RandomizedLight radius={2} position={[5, 2.5, 5]}/>
            </AccumulativeShadows>
            <Environment preset="sunset"/>
            <gridHelper args={[10000, 50]}/>
        </Canvas>
    );
};

export default KriCanvas;