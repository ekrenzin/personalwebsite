<script lang="ts">
    import { onMount } from 'svelte';
    import * as THREE from 'three';
    import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
  
    let canvas: HTMLCanvasElement;
    let clock = new THREE.Clock();
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let avatarModel;
  
    onMount(() => {
      const scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  
      // Adjust camera position and orientation
      camera.position.set(0, -2, 3); // Position the camera
      camera.lookAt(0, -2, 0); // Focus on the bottom right of the scene
  
      const renderOptions = { alpha: true, canvas: canvas, antialias: true };
      renderer = new THREE.WebGLRenderer(renderOptions);
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  
      loadAvatar(scene);
      loadLights(scene);
      animate(scene);
  
      window.addEventListener('resize', onWindowResize, false);
      window.addEventListener('pointermove', onMouseMove, false);
  
      return () => {
        window.removeEventListener('resize', onWindowResize);
        window.removeEventListener('pointermove', onMouseMove);
        scene.clear();
        renderer.dispose();
      };
    });
  
    function loadAvatar(scene: THREE.Scene) {
      const loader = new GLTFLoader();
      loader.load(
        './my_head.glb',
        function (gltf: any) {
				gltf.scene.position.y = -5.7;
				gltf.scene.position.z = -1;
                gltf.scene.position.x = 0.25;

				gltf.scene.scale.set(8, 8, 8);
				avatarModel = gltf.scene;

				// Hide and remove the hands
				const leftHand = avatarModel.getObjectByName('LeftHand');
				const rightHand = avatarModel.getObjectByName('RightHand');

                

				leftHand.position.set(0, 0, 100);
				rightHand.position.set(0, 0, 100);

                // Traverse the model and log bones
                avatarModel.traverse(function (object) {
                    if (object.isBone) {
                    console.log(object.name); // Log the bone name
                    }
                });
				scene.add(gltf.scene);
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );
    }
  
    function loadLights(scene: THREE.Scene) {
      const ambientLight = new THREE.AmbientLight(0xffffff);
      scene.add(ambientLight);
  
      const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
      directionalLight.position.set(0, 1, 1);
      scene.add(directionalLight);
    }
  
    function animate(scene: THREE.Scene) {
      requestAnimationFrame(() => animate(scene));
      renderer.render(scene, camera);
    }
  
    function onWindowResize() {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    }
  
    let mouse = new THREE.Vector2();
    let raycaster = new THREE.Raycaster();
  
    function onMouseMove(event: MouseEvent) {
      const canvasBounds = canvas.getBoundingClientRect();
      mouse.x = ((event.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
      mouse.y = -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;
      updateHeadRotation();
    }
  
    function updateHeadRotation() {
      if (!avatarModel) return;
      const head = avatarModel.getObjectByName('Head');
      if (!head) return;
      const spine = avatarModel.getObjectByName('Spine');
        if (!spine) return;
        const neck = avatarModel.getObjectByName('Neck');
        if (!neck) return;


      raycaster.setFromCamera(mouse, camera);
      const planeNormal = new THREE.Vector3(0, 0, 1);
      const planePoint = avatarModel.position.clone();
      const targetPoint = new THREE.Vector3();
      raycaster.ray.intersectPlane(new THREE.Plane(planeNormal, planePoint.dot(planeNormal)), targetPoint);
      
        // if (targetPoint) neck.lookAt(targetPoint);
        if (targetPoint) head.lookAt(targetPoint);
    }
  </script>
  
  <svelte:head>
    <title>3D Avatar</title>
  </svelte:head>
  
  <canvas bind:this={canvas}></canvas>
  
  <style>
    canvas {
      width: 200px;
      height: 200px;
      position: fixed;
      bottom: 0;
      right: 0;
      user-select: none;
      pointer-events: auto;
    }
  </style>
  