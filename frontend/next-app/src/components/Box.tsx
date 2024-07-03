import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

function Box(props) {
    const texture = useLoader(TextureLoader, "/texture.png");
    return (
        <mesh {...props} recieveShadow={true} castShadow>
            <boxGeometry />
            <meshPhysicalMaterial   map={texture}  color={"white"} />
        </mesh>
    );
}
export default Box;