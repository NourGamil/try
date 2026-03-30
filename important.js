"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeScene() {
  const thisref = useRef(null);

  useEffect(() => {
    const ThreeScene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight ,0.1,1000)
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.position.set( 0, 0, 100 );
    camera.lookAt( 0, 0, 0 );

    const material = new THREE.LineBasicMaterial({color : 0x0000ff});
    const points = [];
    points.push(new THREE.Vector3(-10,0,0));
    points.push(new THREE.Vector3(0,10,0));
    points.push(new THREE.Vector3(10,0,0));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.Line(geometry , material);

    ThreeScene.add(line);
    renderer.render(ThreeScene,camera)

    thisref.current.appendChild(renderer.domElement);
  }, []);

  return <div ref={thisref} style={{ width: "100vw", height: "100vh" ,overflow: "hidden"}} />;
}