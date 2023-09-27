<script lang="ts">
	import * as THREE from 'three';
	import TWEEN from '@tweenjs/tween.js';
	import { onMount, onDestroy } from 'svelte';
	import type { Scene, PerspectiveCamera, WebGLRenderer } from 'three';
	import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
	import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
	import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

	export let files: any;

	let sceneContainer: HTMLDivElement;
	let canvas: HTMLCanvasElement;
	let scene: Scene;
	let renderer: WebGLRenderer;
	let camera: PerspectiveCamera;
	let images: Array<THREE.Mesh> = [];
	let renderScene: RenderPass;
	let bloomComposer: EffectComposer;
	let bloomPass: UnrealBloomPass;

	const params = {
		exposure: 0.5,
		bloomStrength: 1,
		bloomThreshold: 0.1,
		bloomRadius: 0.5,
		scene: 'Scene with Glow'
	};

	onMount(async () => {
		loadScene();
		loadPostProcessing();
		loadImages();
		displayImages();
		return destroy;
	});

	onDestroy(destroy);

	function destroy() {
		try {
			scene.remove(...scene.children);
		} catch (e) {
			console.warn(e);
		}
		try {
			window.location.reload();
		} catch (e) {
			console.warn(e);
		}
	}

	async function loadScene() {
		scene = new THREE.Scene();
		renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		camera = new THREE.PerspectiveCamera();

		//add lights to scene
		const ambientLight = new THREE.AmbientLight('white', 0.2);
		scene.add(ambientLight);

		loadRenderer(renderer, renderLoop);
		windowResizeEventListener(camera, renderer);
		//rotate the camera indefinitely with a tween
		const tween = new TWEEN.Tween(camera.rotation)
			.to({ x: 2 * Math.PI, y: 0, z: 0 }, 10000)
			.repeat(Infinity)
			.easing(TWEEN.Easing.Quadratic.InOut)
			.onUpdate(() => {
				for (const image of images) {
					image.rotation.x = camera.rotation.x;
					image.rotation.z = camera.rotation.x;
				}
			})
			.start();
		return { scene, renderer, camera };
	}

	function loadPostProcessing() {
		bloomComposer = new EffectComposer(renderer);
		renderScene = new RenderPass(scene, camera);

		bloomPass = new UnrealBloomPass(
			new THREE.Vector2(window.innerWidth, window.innerHeight),
			1.5,
			0.4,
			0.85
		);

		bloomPass.threshold = params.bloomThreshold;
		bloomPass.strength = params.bloomStrength;
		bloomPass.radius = params.bloomRadius;

		bloomComposer.addPass(renderScene);
		bloomComposer.addPass(bloomPass);
	}

	function loadImages() {
		//create a geometry

		//loop through files
		const textureLoader = new THREE.TextureLoader();
		textureLoader.crossOrigin = 'Anonymous';

		let geom = new THREE.BoxGeometry(5, 5, 1, 1);
		// planeCurve(geom, 1);
		files.forEach((file) => {
			//create a material
			const texture = textureLoader.load(file.source);
			const material = new THREE.MeshPhongMaterial({
				map: texture,
				emissive: 'white',
				emissiveMap: texture,
				emissiveIntensity: 0.025
			});

			const mesh = new THREE.Mesh(geom, material);
			images.push(mesh);
		});
	}

	function displayImages() {
		//display all of the images in a circle around the camera
		let radius = 20;
		let angle = 0;
		let angleIncrement = (Math.PI * 2) / images.length;
		images.forEach((image) => {
			scene.add(image);
			image.position.y = Math.sin(angle) * radius;
			image.position.z = Math.cos(angle) * radius;
			angle += angleIncrement;
			//image should look at camera
			image.lookAt(camera.position);
		});
	}

	function planeCurve(g, z) {
		let p = g.parameters;
		let hw = p.width * 0.5;

		let a = new THREE.Vector2(-hw, 0);
		let b = new THREE.Vector2(0, z);
		let c = new THREE.Vector2(hw, 0);

		let ab = new THREE.Vector2().subVectors(a, b);
		let bc = new THREE.Vector2().subVectors(b, c);
		let ac = new THREE.Vector2().subVectors(a, c);

		let r = (ab.length() * bc.length() * ac.length()) / (2 * Math.abs(ab.cross(ac)));

		let center = new THREE.Vector2(0, z - r);
		let baseV = new THREE.Vector2().subVectors(a, center);
		let baseAngle = baseV.angle() - Math.PI * 0.5;
		let arc = baseAngle * 2;

		let uv = g.attributes.uv;
		let pos = g.attributes.position;
		let mainV = new THREE.Vector2();
		for (let i = 0; i < uv.count; i++) {
			let uvRatio = 1 - uv.getX(i);
			let y = pos.getY(i);
			mainV.copy(c).rotateAround(center, arc * uvRatio);
			pos.setXYZ(i, mainV.x, y, -mainV.y);
		}

		pos.needsUpdate = true;
	}

	function windowResizeEventListener(camera, renderer) {
		const sceneBounds = sceneContainer.getBoundingClientRect();
		const { width, height } = sceneBounds;
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
		renderer.setSize(width, height);
		if (bloomComposer) bloomComposer.setSize(width, height);
		window.onresize = () => windowResizeEventListener(camera, renderer);
	}

	function loadRenderer(renderer, renderLoop) {
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);

		renderer.shadowMap.enabled = true;
		renderer.xr.enabled = true;
		renderer.outputEncoding = THREE.sRGBEncoding;
		renderer.localClippingEnabled = true;
		renderer.xr.setFramebufferScaleFactor(2.0);
		renderer.outputEncoding = THREE.sRGBEncoding;

		renderer.setAnimationLoop(renderLoop);
		sceneContainer.appendChild(renderer.domElement);
	}

	async function renderLoop() {
		renderer.render(scene, camera);
		//update all visible objects
		scene.traverseVisible((object: any) => {
			if (object.update) {
				object.update();
			}
		});
		bloomComposer.render();
		TWEEN.update();
	}
</script>

<div bind:this={sceneContainer} class="sceneContainer" />

<style>
	.sceneContainer {
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
		background-color: black;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
</style>
