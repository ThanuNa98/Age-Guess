import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const LoadingScreen = () => {
    const containerRef = useRef(null);
    const rendererRef = useRef(null);
    const objectRef = useRef(null);

    useEffect(() => {
        // Create a scene
        const scene = new THREE.Scene();

        // Create a camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        // Create a renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xf0f0f0);
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Create initial geometry
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00FF7F, wireframe: true });
        const object = new THREE.Mesh(geometry, material);
        scene.add(object);
        objectRef.current = object;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            // Update object scale
            const time = Date.now() * 0.001;
            const scale = Math.sin(time) * 0.5 + 1; // Adjust the scaling factor as needed
            object.scale.set(scale, scale, scale);

            // Rotate the object
            object.rotation.x += 0.01;
            object.rotation.y += 0.01;

            renderer.render(scene, camera);
        };

        animate();

        // Clean up on unmount
        return () => {
            if (rendererRef.current) {
                rendererRef.current.dispose();
            }
            if (containerRef.current && containerRef.current.firstChild) {
                containerRef.current.removeChild(containerRef.current.firstChild);
            }
        };
    }, []);

    return (
        <div className="loading-screen" ref={containerRef}>
            <div className="loading-text">Loading...</div>
        </div>
    );
};

export default LoadingScreen;
