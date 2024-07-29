import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, AccumulativeShadows, RandomizedLight, Edges, OrbitControls, Outlines, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface BoxFromPointsProps {
    position: [number, number, number]; // Position in 3D space
    width: number;
    height: number;
    depth: number;
    topRightOs: number;
    bottomRightOs: number;
    topLeftOs: number;
    bottomLeftOs: number;
    color?: string; // Color of the box material (optional if texture is provided)
    textureUrl?: string; // URL of the texture image (optional)
    rotation?: [number, number, number]; // Rotation in radians (optional)
    textureRepeat?: [number, number]; // Texture repeat (optional)
    perimeter?: [];
    internalPerimeter?:[];
}

const ShapeFromPoints: React.FC<BoxFromPointsProps> = ({
                                                         position = [0, 0, 0],
                                                         width = 1,
                                                         height = 1,
                                                         depth = 1,
                                                         topRightOs = 0,
                                                         bottomRightOs = 0,
                                                         topLeftOs = 0,
                                                         bottomLeftOs = 0,
                                                         color = 'blue',
                                                         textureUrl,
                                                         rotation = [0, 0, 0], // Default rotation
                                                         textureRepeat = [0.01, 0.01], // Default texture repeat
                                                         perimeter=[],
                                                           internalPerimeter=[]
                                                    }) => {
    const [texture, setTexture] = useState<THREE.Texture | null>(null);
    const [hovered, hover] = useState(false)

    useEffect(() => {
        if (textureUrl && !texture) {
            const loader = new THREE.TextureLoader();
            loader.load(
                textureUrl,
                (loadedTexture) => {
                    console.log('Texture loaded successfully:', loadedTexture);
                    loadedTexture.wrapS = THREE.RepeatWrapping;
                    loadedTexture.wrapT = THREE.RepeatWrapping;
                    loadedTexture.repeat.set(textureRepeat[0], textureRepeat[1]);
                    setTexture(loadedTexture);
                },
                undefined,
                (error) => {
                    console.error('Error loading texture:', error);
                }
            );
        }
    }, [textureUrl, textureRepeat]);

    const calculatePoints = () => {
        return [
            [-width * 2, 0 ],
            [-width / 2 + bottomLeftOs, 0], // bottom-left
            [-width / 2 + topLeftOs, height ], // top-left
            [width / 2 + topRightOs, height ], // top-right
            [width / 2 + bottomRightOs, 0], // bottom-right
            [width * 2 + bottomRightOs, 0],
            [width * 2 + bottomRightOs, height + 30 ],
            [-width * 2, height + 30 ]

        ];
    };

    const resetUVs = (geometry) => {
        const pos = geometry.getAttribute('position');
        const nor = geometry.getAttribute('normal');
        const uvs = geometry.getAttribute('uv');

        for (let i = 0; i < pos.count; i++) {
            let x = 0;
            let y = 0;

            const nx = Math.abs(nor.getX(i));
            const ny = Math.abs(nor.getY(i));
            const nz = Math.abs(nor.getZ(i));

            // if facing X
            if (nx >= ny && nx >= nz) {
                x = pos.getZ(i);
                y = pos.getY(i);
            }

            // if facing Y
            if (ny >= nx && ny >= nz) {
                x = pos.getX(i);
                y = pos.getZ(i);
            }

            // if facing Z
            if (nz >= nx && nz >= ny) {
                x = pos.getX(i);
                y = pos.getY(i);
            }

            uvs.setXY(i, x, y);
        }
        geometry.uvsNeedUpdate = true;
    };

    const createBoxGeometry = () => {
        const points = perimeter;
        const internalPoints = internalPerimeter;

        const shape = new THREE.Shape();
        shape.moveTo(points[0][0], points[0][1]);
        for (let i = 1; i < points.length; i++) {
            shape.lineTo(points[i][0], points[i][1]);
        }
        shape.lineTo(points[0][0], points[0][1]); // Close the shape

        if(internalPoints.length>0)
        {
            shape.moveTo(internalPoints[0][0], internalPoints[0][1]);
            for (let i = 1; i < internalPoints.length; i++) {
                shape.lineTo(internalPoints[i][0], internalPoints[i][1]);
            }
            shape.lineTo(internalPoints[0][0], internalPoints[0][1]); // Close the shape
        }


        const extrudeSettings: THREE.ExtrudeGeometryOptions = {
            depth: depth, // Extrusion depth
            bevelEnabled: false, // No bevel
        };

        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

        // Apply the UV mapping
        resetUVs(geometry);

        return geometry;
    };

    const material = texture
        ? new THREE.MeshStandardMaterial({ map: texture, roughness: 1, metalness: 0 })
        : new THREE.MeshStandardMaterial({ color });

    // Function to calculate all vertices and create line segments
    const createLines = (geometry) => {
        const vertices = geometry.attributes.position.array;
        const edges = new THREE.EdgesGeometry(geometry);
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
        return <lineSegments geometry={edges} material={lineMaterial} />;
    };

    const boxGeometry = createBoxGeometry();

    return (

        <mesh
            position={position}
            rotation={rotation}
            geometry={boxGeometry}
            material={material}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            castShadow
            receiveShadow>
            <Edges linewidth={1} threshold={15} color={hovered ? "#c02040" : "black"} />
            <Outlines thickness={1} color={hovered ? "#c02040" : "black"} />
        </mesh>

    );
};

export default ShapeFromPoints;