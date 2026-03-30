"use client"
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { useEffect,useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Page(){
    const theRef = useRef(null);

    useEffect(()=>{
            const timeout = setTimeout(() => {
        if (!theRef.current) return;
    const width = theRef.current.clientWidth;
    const height = theRef.current.clientHeight;
// scene
    const scene = new THREE.Scene();

// camera
    const camera = new THREE.PerspectiveCamera(50, width/height, 0.1, 1000);
        camera.position.z = 5;

// light
    const light = new THREE.AmbientLight( 0xffffff,3)
        light.position.set(0,0,1)
        scene.add( light );

// renderer
    const renderer = new THREE.WebGLRenderer({antialias: true });
    renderer.setSize(width,height);
    // renderer.domElement.style.background = "blue";
        // renderer.setSize(width, height);
        theRef.current.appendChild( renderer.domElement );
                console.log("Canvas added:", renderer.domElement);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.setClearColor(0x000000,1);
        // renderer.setClearColor(0x000000, 0); // transparent background

// controls
        // const controls = new OrbitControls(camera, renderer.domElement);
        // controls.enableDamping = true;
        // controls.enablePan = false;


// object to render
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('draco/'); 
    loader.setDRACOLoader(dracoLoader);
    const orbitGroup = new THREE.Group();
    const spinTl = gsap.timeline({repeat : -1})
    scene.add(orbitGroup);

        
        loader.load('/images/shoe.glb', (gltf) => {
            const model = gltf.scene;

            model.scale.set(1,1,1);
            model.position.set(0,0,0.5);
            model.rotation.set(0,Math.PI * 0.5,Math.PI * 0.3);

            scene.add(model);

            const textureLoader = new THREE.TextureLoader();
            const newTexture = textureLoader.load('images/texture_green.webp');
                    newTexture.flipY = false;
                    newTexture.colorSpace = THREE.SRGBColorSpace;
                    renderer.outputColorSpace = THREE.SRGBColorSpace;
                model.traverse((child) => {
                if (child.isMesh) {
                    child.material = child.material.clone(); // IMPORTANT
                    child.material.map = newTexture;
                    child.material.needsUpdate = true;
                }
            });
        orbitGroup.add(model); 
        });

        loader.load('images/shoe.glb', (gltf) => {
            const model = gltf.scene;

            model.scale.set(1,1,1);
            model.position.set(0.5,0,0);
            model.rotation.set(0,Math.PI * 1,Math.PI * 0.3);

            scene.add(model);

            const textureLoader = new THREE.TextureLoader();
            const newTexture = textureLoader.load('images/texture_blue.webp');

            // very important to load  texture right not reversed and colors not washed
                    newTexture.flipY = false;
                    newTexture.colorSpace = THREE.SRGBColorSpace;
                    renderer.outputColorSpace = THREE.SRGBColorSpace;
                model.traverse((child) => {
                if (child.isMesh) {
                    child.material = child.material.clone(); // IMPORTANT
                    child.material.map = newTexture;
                    child.material.needsUpdate = true;
                }
            });
            orbitGroup.add(model);
        });

        loader.load('images/shoe.glb', (gltf) => {
            const model = gltf.scene;

            model.scale.set(1,1,1);
            model.position.set(0,0,-0.5);
            model.rotation.set(0,Math.PI * 1.5,Math.PI * 0.3);

            scene.add(model);

            const textureLoader = new THREE.TextureLoader();
            const newTexture = textureLoader.load('images/texture_brown.webp');

            // very important to load  texture right not reversed and colors not washed
                    newTexture.flipY = false;
                    newTexture.colorSpace = THREE.SRGBColorSpace;
                    renderer.outputColorSpace = THREE.SRGBColorSpace;
                model.traverse((child) => {
                if (child.isMesh) {
                    child.material = child.material.clone(); // IMPORTANT
                    child.material.map = newTexture;
                    child.material.needsUpdate = true;
                }
            });
            orbitGroup.add(model);
        });

                loader.load('images/shoe.glb', (gltf) => {
            const model = gltf.scene;

            model.scale.set(1,1,1);
            model.position.set(-0.5,0,0);
            model.rotation.set(0,Math.PI * 2,Math.PI * 0.3);

            scene.add(model);

            const textureLoader = new THREE.TextureLoader();
            const newTexture = textureLoader.load('images/texture_red.webp');

            // very important to load  texture right not reversed and colors not washed
                    newTexture.flipY = false;
                    newTexture.colorSpace = THREE.SRGBColorSpace;
                    renderer.outputColorSpace = THREE.SRGBColorSpace;
                model.traverse((child) => {
                if (child.isMesh) {
                    child.material = child.material.clone(); // IMPORTANT
                    child.material.map = newTexture;
                    child.material.needsUpdate = true;
                }
            });
            orbitGroup.add(model);
        });

        spinTl.to(orbitGroup.rotation,{
                y:"+=" + Math.PI * 2,
                // x:"+=" + Math.PI * 2,
                duration:10,
                ease: "none" 
                // delay:2
        })


// mouse
    
        // let mouseX = 0;
        // let mouseY = 0;

        // window.addEventListener("mousemove",(e)=>{
        //     mouseX = (e.clientX / window.innerWidth) * 2 - 1 ;
        //     mouseY = (e.clientY / window.innerWidth) * 2 - 1 ;
        // })


// stop when tap change 
    let isRunning = true;
        document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        isRunning = false;

        // pause GSAP
        spinTl.pause();
    } else {
        if (!isRunning) {
            isRunning = true;
            animate(); // restart loop
        }

        // resume GSAP
        spinTl.resume();
    }
    });

// animation
    function animate(){
        if (!isRunning) return;
        requestAnimationFrame(animate)
        renderer.render(scene, camera);
        // controls.update();
    };
    animate()

console.log(renderer.info.render);
renderer.domElement.style.background = "red";
    }, 100); // 👈 important for mobile

    return () => clearTimeout(timeout);
    
    },[])

    return(
        <>

        <div ref={theRef} className="bg-amber-400" style={{ width: "100%", height: "100dvh" }}>
            
        </div>
        <div className="w-[100px] h-[100px] bg-amber-600">
            <p></p>
        </div>
        </>
    )
}