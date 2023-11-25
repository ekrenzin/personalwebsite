<script lang="ts">
	import { fade } from 'svelte/transition';
	import * as THREE from 'three';
	import TWEEN, { Tween } from '@tweenjs/tween.js';
	import logo from '$lib/assets/logo.svg';
	import { onMount, onDestroy } from 'svelte';
	import type { Scene, PerspectiveCamera, WebGLRenderer, Object3D, Color } from 'three';
	import Orbiter from '$lib/components/scene/Orbiter';
	import GlowingShape from './GlowingShape';
	import { gradientColors } from '$lib/utils/gradientColors';
	import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
	import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
	import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
	import type { view } from '$lib/types/scene';
	import { VRButton } from 'three/addons/webxr/VRButton.js';

	import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
	import SceneText from '../SceneText.svelte';

	let sceneContainer: HTMLDivElement;
	let canvas: HTMLCanvasElement;
	let video: HTMLVideoElement;
	let scene: Scene;
	let renderer: WebGLRenderer;
	let camera: PerspectiveCamera;
	let renderScene: RenderPass;
	let finalComposer: EffectComposer;
	let bloomComposer: EffectComposer;
	let bloomLayer: THREE.Layers;
	let bloomPass: UnrealBloomPass;
	let vrButton: VRButton;

	let desktop: any;

	let progress: { value: number } = { value: 0 };
	let orbitersLength: number = 500;
	let orbiters: THREE.Group = new THREE.Group();

	let tweens: any = [];
	let loadingText: string = 'Loading';

	const raycaster = new THREE.Raycaster();
	const mouse = new THREE.Vector2();

	//hex for red

	const colors = {
		colorOne: '#FF0000',
		colorTwo: '#274472',
		colorThree: '#5885AF',
		colorFour: '#C3E0E5'
	};

	const overrideColors = {
		colorOne: null,
		colorTwo: null,
		colorThree: null,
		colorFour: null
	};

	//create an array of 20 length of bright colors with each color as a hex code hard coded
	const brightColors = [
		'#FF0000',
		'#FF7F00',
		'#FFFF00',
		'#00FF00',
		'#0000FF',
		'#4B0082',
		'#9400D3',
		'#FF0000',
		'#FF7F00',
		'#FFFF00',
		'#00FF00',
		'#0000FF',
		'#4B0082',
		'#9400D3',
		'#FF0000',
		'#FF7F00',
		'#FFFF00',
		'#00FF00',
		'#0000FF',
		'#4B0082',
		'#9400D3'
	];

	const date = new Date();
	let formattedTime = {
		days: date.getDate(),
		hours: date.getHours(),
		minutes: date.getMinutes(),
		seconds: date.getSeconds()
	};

	const ENTIRE_SCENE = 0;
	let views: Array<view> = [
		{
			name: 'orbiters',
			position: { x: 0, y: -0.75, z: -1 },
			bloom: true,
			bloomIntensity: 2,
			rotation: { x: Math.PI / 16, y: 0, z: 0 },
			onLoad: () => {
				//desktop.displayTextOnScreen('CLICK ME');
				//desktop.visible = false;
			},
			lock: false
		},
		{
			name: 'explanation',
			position: { x: 0, y: -0.75, z: -1 },
			bloom: true,
			bloomIntensity: 2,
			rotation: { x: 0, y: Math.PI / 16, z: 0 },
			onLoad: () => {
				//desktop.displayTextOnScreen('CLICK ME');
				//desktop.visible = false;
			},
			lock: false
		},
		{
			name: 'wall',
			position: { x: -1, y: -0.5, z: 0 },
			bloom: true,
			bloomIntensity: 4,
			rotation: { x: 0, y: -Math.PI / 3, z: 0 },
			lock: true
		}
	];
	let currentView: view = views[0];
	const params = {
		exposure: 0.5,
		bloomStrength: 2,
		bloomThreshold: 0,
		bloomRadius: 0.5,
		scene: 'Scene with Glow'
	};

	onMount(async () => {
		loadScene();
		loadOrbiters();
		setInterval(() => {
			//change some of the orbiters colors to a random bright color
			if (
				!overrideColors.colorOne &&
				!overrideColors.colorTwo &&
				!overrideColors.colorThree &&
				!overrideColors.colorFour
			)
				orbiters.children.forEach((orbiter: any, index: number) => {
					if (index % Math.round((Math.random() * orbitersLength) / 5) === 0) {
						const mat = orbiter.children[0].material;
						mat.color.set(brightColors[Math.floor(Math.random() * brightColors.length)]);
					}
				});
		}, 1000);

		return destroy;
	});

	onDestroy(destroy);

	function destroy() {
		try {
			progress.value = 0;
		} catch (e) {
			console.log(e);
		}

		try {
			renderer.dispose();
		} catch (e) {
			console.log(e);
		}
		try {
			window.removeEventListener('pointerdown', onPointerDown);
		} catch (e) {
			console.log(e);
		}
		try {
			//get rid of the VR button
			vrButton.remove();
		} catch (e) {
			console.log(e);
		}
	}

	async function loadScene() {
		scene = new THREE.Scene();
		renderer = new THREE.WebGLRenderer({ antialias: true, canvas, alpha: true });
		vrButton = VRButton.createButton(renderer);
		document.body.appendChild(vrButton);
		renderer.xr.enabled = true;
		camera = new THREE.PerspectiveCamera();

		camera.position.x = currentView.position.x;
		camera.position.y = currentView.position.y;
		camera.position.z = currentView.position.z;

		camera.rotation.x = currentView.rotation.x;
		camera.rotation.y = currentView.rotation.y;
		camera.rotation.z = currentView.rotation.z;

		//add lights to scene
		const ambientLight = new THREE.AmbientLight('white', 1);
		scene.add(ambientLight);

		loadRenderer(renderer, renderLoop);
		windowResizeEventListener(camera, renderer);

		loadPostProcessing();

		return { scene, renderer, camera };
	}

	function loadPostProcessing() {
		finalComposer = new EffectComposer(renderer);
		bloomComposer = new EffectComposer(renderer);
		renderScene = new RenderPass(scene, camera);

		bloomLayer = new THREE.Layers();
		bloomLayer.set(1);

		const finalPass = new ShaderPass(
			new THREE.ShaderMaterial({
				uniforms: {
					baseTexture: { value: null },
					bloomTexture: { value: bloomComposer.renderTarget2.texture }
				},
				vertexShader: document.getElementById('vertexshader').textContent,
				fragmentShader: document.getElementById('fragmentshader').textContent,
				defines: {}
			}),
			'baseTexture'
		);
		finalPass.needsSwap = true;
		finalPass.needsSwap = true;

		finalComposer.addPass(renderScene);
		finalComposer.addPass(finalPass);

		bloomPass = new UnrealBloomPass(
			new THREE.Vector2(window.innerWidth, window.innerHeight),
			1.5,
			0.4,
			0.85
		);

		bloomPass.threshold = params.bloomThreshold;
		bloomPass.strength = params.bloomStrength;
		bloomPass.radius = params.bloomRadius;

		bloomComposer.renderToScreen = false;
		bloomComposer.addPass(renderScene);
		bloomComposer.addPass(bloomPass);
	}

	async function loadOrbiters() {
		for (let i = 0; i < orbitersLength; i++) {
			const orbitRadius = Math.random() * 2.5 + 0.5;
			const speed = Math.random() * 0.001 + 0.0001;
			const position = new THREE.Vector3(
				Math.random() * 2 - 1,
				Math.random() * 2 - 1,
				Math.random() * -5 - 1
			);
			const orbit = new Orbiter({ radius: orbitRadius, target: position, speed });
			const glowingObject = new GlowingShape('white');
			orbit.add(glowingObject);
			orbiters.add(orbit);
		}
		updateColors(null);
		scene.add(orbiters);
	}

	async function updateColors(c: any) {
		const colorOne = overrideColors.colorOne || colors.colorOne;
		const colorTwo = overrideColors.colorTwo || colors.colorTwo;
		const colorThree = overrideColors.colorThree || colors.colorThree;
		const colorFour = overrideColors.colorFour || colors.colorFour;

		const gradientOne = gradientColors(colorOne, colorTwo, 20);
		const gradientTwo = gradientColors(colorThree, colorFour, 20);

		//every 10ms update one orbirter material with the new color

		orbiters.children.forEach((orbit, i) => {
			const percentage = i / orbitersLength;
			const color =
				Math.random() > 0.2
					? `#${gradientOne[Math.floor(percentage * gradientOne.length)]}`
					: `#${gradientTwo[Math.floor(percentage * gradientTwo.length)]}`;
			orbit.children[0].material.color.set(color);
		});
	}

	function onPointerDown(event) {
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

		raycaster.setFromCamera(mouse, camera);
		const intersects = raycaster.intersectObjects(scene.children);
		if (intersects.length > 0) {
			const object = intersects[0].object;
			if (object.name.includes('icon')) {
			}
		}
	}

	function advanceView() {
		try {
			const index = views.findIndex((v) => v.name === currentView.name);
			const nextView = views[index + 1] || views[0];
			if (!nextView) return;
			loadView(nextView.name);
		} catch (e) {
			console.log(e);
		}
	}

	function decrementView() {
		try {
			const index = views.findIndex((v) => v.name === currentView.name);
			const nextView = views[index - 1];
			if (!nextView) return;
			loadView(nextView.name);
		} catch (e) {
			console.log(e);
		}
	}

	function loadView(viewName: string, overrideLock?: boolean) {
		for (const view of views) {
			if (view && view.name === viewName) {
				if (currentView.name === viewName) return;
				currentView = view;
				if (view.bloom) {
					orbiters.visible = true;
				}
				for (const t of tweens) {
					t.stop();
				}
				if (currentView.onLoad) currentView.onLoad();
				const cameraPositionTween = new TWEEN.Tween(camera.position)
					.to(view.position, 2000)
					.easing(TWEEN.Easing.Quadratic.InOut)
					.start();
				const cameraRotationTween = new TWEEN.Tween(camera.rotation)
					.to(view.rotation, 3000)
					.easing(TWEEN.Easing.Quadratic.InOut)
					.start();
				const bloomTween = new TWEEN.Tween(bloomPass)
					.to({ strength: view.bloomIntensity }, 2000)
					.easing(TWEEN.Easing.Quadratic.InOut)
					.onUpdate(() => {
						for (const orbiter of orbiters.children) {
							//only if orbiter is type Orbiter
							orbiter.opacity = bloomPass.strength * 0.0625;
						}
					})
					.onComplete(() => {
						if (!view.bloom) {
							orbiters.visible = false;
						}
					})
					.start();
				tweens.push(cameraRotationTween);
				tweens.push(cameraPositionTween);
				tweens.push(bloomTween);
			}
		}
	}

	function windowResizeEventListener(camera, renderer) {
		// const sceneBounds = sceneContainer.getBoundingClientRect();
		// const { width, height } = sceneBounds;
		//get theight and width of window
		const width = window.innerWidth;
		const height = window.innerHeight;
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
		renderer.setSize(width, height);
		try {
			finalComposer.setSize(width, height);
			bloomComposer.setSize(width, height);
		} catch (e) {
			console.log(e);
		}
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

	async function renderLoop(time) {
		renderer.render(scene, camera);
		//update all visible objects
		scene.traverseVisible((object) => {
			if (object.update) {
				object.update(time);
			}
		});

		camera.layers.set(1);
		bloomComposer.render();

		camera.layers.set(0);
		finalComposer.render();
		TWEEN.update();
	}

	$: updateColors(colors, overrideColors);
</script>

<svelte:head>
	<script type="x-shader/x-vertex" id="vertexshader">

	varying vec2 vUv;

	void main() {

		vUv = uv;

		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

	}

	</script>

	<script type="x-shader/x-fragment" id="fragmentshader">

	uniform sampler2D baseTexture;
	uniform sampler2D bloomTexture;

	varying vec2 vUv;

	void main() {

		gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );

	}

	</script>
</svelte:head>
<div bind:this={sceneContainer} class="sceneContainer">
	<SceneText bind:currentView {loadView} {advanceView} {decrementView} />
	<canvas bind:this={canvas} />
</div>

{#if currentView.bloom}
	<div class="color-picker">
		<div class="color-container flex cool-button text-white py-2 px-4 rounded ">
			<input type="color" id="head" name="head" bind:value={overrideColors.colorOne} />
			<input type="color" id="head" name="head" bind:value={overrideColors.colorTwo} />
			<input type="color" id="head" name="head" bind:value={overrideColors.colorThree} />
			<input type="color" id="head" name="head" bind:value={overrideColors.colorFour} />
		</div>
	</div>
{/if}

<style>
	input[type='color'] {
		border: 2px solid gray;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		margin: 5px;
		overflow: hidden;
		cursor: pointer;
	}
	input[type='color']::-webkit-color-swatch-wrapper {
		padding: 0;
	}
	input[type='color']::-webkit-color-swatch {
		border: none;
	}
	.sceneContainer {
		top: 0;
		left: 0;
		height: 100%;
		position: relative;
	}

	canvas {
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		position: fixed;
	}

	.color-container {
		display: flex;
		margin: auto;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.color-picker {
		position: fixed;
		bottom: 10px;
		right: 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
