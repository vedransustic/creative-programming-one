import * as THREE from 'three';
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import gsap from "gsap"

let camera, scene, renderer;
const loader = new GLTFLoader()


export function init() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.z = 5;
    camera.rotation.z = 0;

    scene = new THREE.Scene();

    const light = new THREE.AmbientLight(0xffffff, 2)
    scene.add(light)

    // where are those axis - is the model in center?
    //const axesHelper = new THREE.AxesHelper( 5 );
    //scene.add( axesHelper );

    loader.load("/models/scene.gltf", (gltf) => {
        const model = gltf.scene

        // select the Z world axis
        const yAxis = new THREE.Vector3(0, 1, 0);
        model.rotateOnWorldAxis(yAxis, THREE.Math.degToRad(270))
        const xAxis = new THREE.Vector3(1, 0, 0);
        model.rotateOnWorldAxis(xAxis, THREE.Math.degToRad(30))
        model.scale.set(0.02,0.02,0.02)

        gsap.to(camera.position, {
            y: .15,
            ease: "elastic.out(2, 0.6)",
            duration: 5
        })
        gsap.to(camera.position, {
            z: 1,
            ease: "back.out(2)",
            duration: 3.5
        })
        gsap.to(model.rotation, {
            x: -Math.PI*.2 ,
            duration: .75,
            delay: .5
        })
        gsap.to(model.rotation, {
            x: Math.PI*.2 ,
            duration: 1,
            delay: 1.25
        })
        gsap.to(model.rotation, {
            x: Math.PI*.02,
            y: Math.PI*.15,
            z: Math.PI*.2,
            duration: 2,
            delay: 3
        })
        gsap.to(model.position, {
            x: .5,
            y: .5,
            ease: "power2.out",
            duration: 1,
            delay: 4
        })
        gsap.to(model.rotation, {
            x: Math.PI*.5,
            y: Math.PI*.2,
            ease: "power2.out",
            duration: 1,
            delay: 4
        })
        gsap.to(model.scale, {
            x: .01,
            y: .01,
            z: .01,
            ease: "power.out",
            duration: 1,
            delay: 4
        })

        scene.add(model)
    })



    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop( animation );
    renderer.setClearColor(0x272727, 1)
    document.body.appendChild( renderer.domElement );

    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)

    })
}

function animation( time ) {

    renderer.render( scene, camera );
}