import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';


interface ClickableBoxProps {
    color?: string;
    edgeColor?: string;
    edgeHoverColor?: string;
    edgeThickness?: number;
    width?: number;
    height?: number;
    depth?: number;
    position?: [number, number, number];
    selectableEdge?: [];
    onClick?: () => void;
}

interface Edge {
    id: number;
    points: [THREE.Vector3, THREE.Vector3];
}

const ClickableBox: React.FC<ClickableBoxProps> = ({
                                                       color = 'green',
                                                       edgeColor = 'red', // Default edge color
                                                       edgeHoverColor = 'yellow', // Default hover edge color
                                                       edgeThickness = 1, // Default edge thickness
                                                       width = 1,
                                                       height = 1,
                                                       depth = 1,
                                                       position = [0, 0, 0],
                                                       selectableEdge =[],
                                                       onClick,
                                                   }) => {
    const boxRef = useRef<THREE.Mesh>(null);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [hoveredEdge, setHoveredEdge] = useState<number | null>(null);

    const { raycaster, mouse, camera } = useThree();

    useEffect(() => {
        if (boxRef.current) {
            // Calculate edges based on the current position and dimensions of the box
            const halfWidth = width / 2;
            const halfHeight = height / 2;
            const halfDepth = depth / 2;

            const newEdges: Edge[] = [
                // Bottom edges
                { id: 1, points: [new THREE.Vector3(position[0] - halfWidth, position[1] - halfHeight, position[2] - halfDepth), new THREE.Vector3(position[0] + halfWidth, position[1] - halfHeight, position[2] - halfDepth)] },
                { id: 2, points: [new THREE.Vector3(position[0] + halfWidth, position[1] - halfHeight, position[2] - halfDepth), new THREE.Vector3(position[0] + halfWidth, position[1] - halfHeight, position[2] + halfDepth)] },
                { id: 3, points: [new THREE.Vector3(position[0] + halfWidth, position[1] - halfHeight, position[2] + halfDepth), new THREE.Vector3(position[0] - halfWidth, position[1] - halfHeight, position[2] + halfDepth)] },
                { id: 4, points: [new THREE.Vector3(position[0] - halfWidth, position[1] - halfHeight, position[2] + halfDepth), new THREE.Vector3(position[0] - halfWidth, position[1] - halfHeight, position[2] - halfDepth)] },
                // Top edges
                { id: 5, points: [new THREE.Vector3(position[0] - halfWidth, position[1] + halfHeight, position[2] - halfDepth), new THREE.Vector3(position[0] + halfWidth, position[1] + halfHeight, position[2] - halfDepth)] },
                { id: 6, points: [new THREE.Vector3(position[0] + halfWidth, position[1] + halfHeight, position[2] - halfDepth), new THREE.Vector3(position[0] + halfWidth, position[1] + halfHeight, position[2] + halfDepth)] },
                { id: 7, points: [new THREE.Vector3(position[0] + halfWidth, position[1] + halfHeight, position[2] + halfDepth), new THREE.Vector3(position[0] - halfWidth, position[1] + halfHeight, position[2] + halfDepth)] },
                { id: 8, points: [new THREE.Vector3(position[0] - halfWidth, position[1] + halfHeight, position[2] + halfDepth), new THREE.Vector3(position[0] - halfWidth, position[1] + halfHeight, position[2] - halfDepth)] },
                // Vertical edges
                { id: 9, points: [new THREE.Vector3(position[0] - halfWidth, position[1] - halfHeight, position[2] - halfDepth), new THREE.Vector3(position[0] - halfWidth, position[1] + halfHeight, position[2] - halfDepth)] },
                { id: 10, points: [new THREE.Vector3(position[0] + halfWidth, position[1] - halfHeight, position[2] - halfDepth), new THREE.Vector3(position[0] + halfWidth, position[1] + halfHeight, position[2] - halfDepth)] },
                { id: 11, points: [new THREE.Vector3(position[0] + halfWidth, position[1] - halfHeight, position[2] + halfDepth), new THREE.Vector3(position[0] + halfWidth, position[1] + halfHeight, position[2] + halfDepth)] },
                { id: 12, points: [new THREE.Vector3(position[0] - halfWidth, position[1] - halfHeight, position[2] + halfDepth), new THREE.Vector3(position[0] - halfWidth, position[1] + halfHeight, position[2] + halfDepth)] },
            ];

            setEdges(newEdges);
        }
    }, [width, height, depth, position]);

    useFrame(() => {
        if (boxRef.current) {
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(boxRef.current);
            if (intersects.length > 0) {
                let intersectIndex = -1;
                const point = intersects[0].point;

                // Find the closest edge
                let minDistance = Infinity;
                edges.forEach((edge) => {
                    const lineStart = edge.points[0];
                    const lineEnd = edge.points[1];
                    const pointOnLine = pointToLineDistance(point, lineStart, lineEnd);
                    const distance = point.distanceTo(pointOnLine);
                    if (distance < minDistance) {
                        minDistance = distance;
                        intersectIndex = edge.id;
                    }
                });

                setHoveredEdge(intersectIndex);
            } else {
                setHoveredEdge(null);
            }
        }
    });

    const pointToLineDistance = (point: THREE.Vector3, lineStart: THREE.Vector3, lineEnd: THREE.Vector3) => {
        const lineDirection = new THREE.Vector3().subVectors(lineEnd, lineStart).normalize();
        const pointToLineStart = new THREE.Vector3().subVectors(point, lineStart);
        const projectScalar = pointToLineStart.dot(lineDirection);
        const projectedPoint = lineDirection.multiplyScalar(projectScalar).add(lineStart);
        return projectedPoint;
    };

    const handleClick = () => {
        if (hoveredEdge !== null) {
            console.log(`Edge ${hoveredEdge} clicked`);
        }
    };

    return (
        <>
            <mesh ref={boxRef} position={position} onClick={handleClick} castShadow recieveShadow>
                <boxGeometry args={[width, height, depth]} />
                <meshStandardMaterial color={color} />
            </mesh>
            {edges.map((edge) =>
                selectableEdge.includes(edge.id) ? (
                    <Line
                        key={edge.id}
                        points={[edge.points[0].toArray(), edge.points[1].toArray()]} // Convert vector3 to array
                        color={hoveredEdge === edge.id ? edgeHoverColor : edgeColor} // Conditionally set color based on hover state
                        lineWidth={edgeThickness} // Thickness of the line
                    />
                ) : <Line
                    key={edge.id}
                    points={[edge.points[0].toArray(), edge.points[1].toArray()]} // Convert vector3 to array
                    color= "#000"// Conditionally set color based on hover state
                    lineWidth= "1"// Thickness of the line
                    />
            )}
        </>
    );
};

export default ClickableBox;