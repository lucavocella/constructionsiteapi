import { Canvas } from "@react-three/fiber";
import css from "../styles/Scene.module.css";
import Floor from "../components/Floor";
import Box from "../components/Box";
import LightBulb from "../components/LightBulb";
import OrbitControls from "../components/OrbitControls";
import Draggable from "../components/Draggable";
import {Suspense} from "react";

export default function Scene() {
    return (
        <div className={css.scene}>
            <Canvas
                shadows
                className={css.canvas}
                camera={{
                    fov: 100, near: 2, far: 100000,
                    position: [0, 10, 10],
                }}
            >
                <ambientLight color={"white"} intensity={0.3}/>
                <OrbitControls />
                <Floor position={[0, -1, 0]} />
            </Canvas>
        </div>
    );
}