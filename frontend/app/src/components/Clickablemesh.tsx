import React, { useRef, useState, useEffect, MouseEvent } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface ClickableMeshProps {
    color?: string;
    hoverColor?: string;
    points: [THREE.Vector3, THREE.Vector3, THREE.Vector3, THREE.Vector3];
    onClick?: (event: MouseEvent) => void;
}

const ClickableMesh: React.FC<ClickableMeshProps> = ({
                                                         color = 'green',
                                                         hoverColor = 'yellow',
                                                         points,
                                                         onClick,
                                                     }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    const handlePointerOver = () => setHovered(true);
    const handlePointerOut = () => setHovered(false);

    const verticesArray = points.flatMap((p) => [p.x, p.y, p.z]);
    const indicesArray = [0, 1, 2, 0, 2, 3];

    useEffect(() => {
        if (meshRef.current) {
            const geometry = new THREE.BufferGeometry();
            const vertices = new Float32Array(verticesArray);
            geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
            geometry.setIndex(indicesArray);

            meshRef.current.geometry = geometry;
        }
    }, [verticesArray, indicesArray]);

    return (
        <mesh
            ref={meshRef}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            onClick={onClick}
        >
            <meshStandardMaterial color={hovered ? hoverColor : color} />
        </mesh>
    );
};
export default ClickableMesh;