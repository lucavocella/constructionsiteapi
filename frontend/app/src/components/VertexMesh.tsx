import React, { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Edges, Outlines,Line,MeshTransmissionMaterial } from '@react-three/drei';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry';

interface VertexMeshProps {
    points: []; // Array of 8 points in 3D space
    color?: string; // Color of the mesh material (optional)
    position: [number, number, number]; // Position in 3D space
    width: number;
    height: number;
    depth: number;
    topRightOs: number;
    bottomRightOs: number;
    topLeftOs: number;
    bottomLeftOs: number;
    rotation?: [number, number, number]; // Rotation in radians (optional)
    modelWinposition: [number,number];
    transparent: boolean;
}

interface Edge {
    id: number;
    points: [THREE.Vector3, THREE.Vector3];
}

const VertexMesh: React.FC<VertexMeshProps> = ({
                                                   color = 'blue',
                                                   position = [0, 0, 0],
                                                   width = 100,
                                                   height = 100,
                                                   depth = 100,
                                                   topRightOs = 0,
                                                   bottomRightOs = 0,
                                                   topLeftOs = 0,
                                                   bottomLeftOs = 0,
                                                   rotation = [0, 0, 0], // Default rotation
                                                    transparent=false

                                            }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, hover] = useState(false)
    const [points, setPoints] = useState([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [modelWinposition, setModelWinPosition] = useState([]);
    const calculatePoints = () => {
        if (meshRef.current) {
            const newpoints = [
                new THREE.Vector3(position[0] - width / 2, position[1] , position[2]),
                new THREE.Vector3(position[0] + width / 2, position[1] , position[2]),
                new THREE.Vector3(position[0] + width / 2, position[1] , position[2] + depth),
                new THREE.Vector3(position[0] - width / 2, position[1] , position[2] + depth),
                new THREE.Vector3(position[0] - width / 2, position[1] + height , position[2]),
                new THREE.Vector3(position[0] + width / 2, position[1] + height , position[2]),
                new THREE.Vector3(position[0] + width / 2, position[1] + height , position[2] + depth),
                new THREE.Vector3(position[0] - width / 2, position[1] + height , position[2] + depth)
            ];
            setPoints(newpoints);

            const newEdges: Edge[] = [
                // Bottom edges
                { id: 1, points: [newpoints[0], newpoints[1]] },
                { id: 2, points: [newpoints[1], newpoints[2]] },
                { id: 3, points: [newpoints[2], newpoints[3]] },
                { id: 4, points: [newpoints[3], newpoints[0]] },
                // Top edges
                { id: 5, points: [newpoints[4], newpoints[5]] },
                { id: 6, points: [newpoints[5], newpoints[6]] },
                { id: 7, points: [newpoints[6], newpoints[7]] },
                { id: 8, points: [newpoints[7], newpoints[4]] },
                // Vertical edges
                { id: 9, points: [newpoints[4], newpoints[0]] },
                { id: 10, points: [newpoints[5], newpoints[1]] },
                { id: 11, points: [newpoints[6], newpoints[2]] },
                { id: 12, points: [newpoints[7], newpoints[3]] },
            ];

            setEdges(newEdges);

            return newpoints;
        }
    };

    useEffect(() => {
        calculatePoints();
    }, [position, width, height, depth]);

    useFrame(() => {
        if (meshRef.current) {
            // Any animation or logic that needs to run per frame can go here


        }
    });



    const createBoxGeometry = () => {
        if (points.length === 0){
            calculatePoints();
        }

        const geom = new ConvexGeometry(points);
        return geom;
    };

    const boxGeometry = createBoxGeometry();

    const material = new THREE.MeshStandardMaterial({ color });

    const traspMaterial = new THREE.MeshPhysicalMaterial({
        roughness: 1,
        ior:1.5,
        envMapIntensity:0,
        clearcoat:1,
        clearcoatRoughness:0.1,
        normalScale:1,
        clearcoatNormalScale:0.2,
        transmission: 0.8,
        color: "#99ccff",
        metalness:0,
        reflectivity:0.05,
        thickness: 0.001
    })

    const materialProps = {

        roughness: 0,
        transmission:1
    }

    return (

        (transparent) ?
            <mesh
                ref={meshRef}
                geometry={boxGeometry}
                rotation={rotation}
                onPointerOver={() => hover(true)}
                onPointerOut={() => hover(false)}
                material = {traspMaterial}
                castShadow
                receiveShadow>
                {edges.map((edge) =>
                    <Line
                        key={edge.id}
                        points={[edge.points[0].toArray(), edge.points[1].toArray()]} // Convert vector3 to array
                        color={hovered ? "#c02040" : "black"}// Conditionally set color based on hover state
                        lineWidth="1"// Thickness of the line
                    />
                )}

            </mesh>
            :
            <mesh
                ref={meshRef}
                geometry={boxGeometry}
                rotation={rotation}
                material={material}
                onPointerOver={() => hover(true)}
                onPointerOut={() => hover(false)}
                castShadow
                receiveShadow>
                {edges.map((edge) =>
                    <Line
                        key={edge.id}
                        points={[edge.points[0].toArray(), edge.points[1].toArray()]} // Convert vector3 to array
                        color={hovered ? "#c02040" : "black"}// Conditionally set color based on hover state
                        lineWidth="1"// Thickness of the line
                    />
                )}
                <Outlines thickness={1} color={hovered ? "#c02040" : "black"}/>
            </mesh>


    )
        ;
};

export default VertexMesh;
