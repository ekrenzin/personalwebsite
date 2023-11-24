<script lang="ts">
	import { onMount } from 'svelte';
	import { WebGLRenderer, Scene, PerspectiveCamera, Vector2 } from 'three';
	import TWEEN from '@tweenjs/tween.js';
	import { avatarCamera, avatarScene, avatarModel, avatarRenderer } from './AvatarScene';
	import { updateHeadRotation } from './AvatarHead';

	let canvas: HTMLCanvasElement;
	let camera: PerspectiveCamera;
	let renderer: WebGLRenderer;
	let mouse = new Vector2();

	onMount(() => {
		const scene = new Scene();
		camera = new PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);

		// Adjust camera position and orientation
		camera.position.set(0, -2, 3); // Position the camera
		camera.lookAt(0, -2, 0); // Focus on the bottom right of the scene

		const renderOptions = { alpha: true, canvas: canvas, antialias: true };
		renderer = new WebGLRenderer(renderOptions);
		renderer.setSize(canvas.clientWidth, canvas.clientHeight);

		window.addEventListener('resize', onWindowResize, false);
		window.addEventListener('pointermove', onMouseMove, false);
		window.addEventListener('touchmove', onTouchMove, false);

		avatarScene.set(scene);
		avatarCamera.set(camera);
		avatarRenderer.set(renderer);


		animate(scene);

		return () => {
			window.removeEventListener('resize', onWindowResize);
			window.removeEventListener('pointermove', onMouseMove);
			window.removeEventListener('touchmove', onTouchMove);
			scene.clear();
			renderer.dispose();
		};
	});


	function animate(scene: THREE.Scene) {
		requestAnimationFrame(() => animate(scene));
		renderer.render(scene, camera);
    	TWEEN.update();
	}

	function onWindowResize() {
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(canvas.clientWidth, canvas.clientHeight);
	}


	function onMouseMove(event: MouseEvent) {
		const canvasBounds = canvas.getBoundingClientRect();
		mouse.x = ((event.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
		mouse.y = -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;
		updateHeadRotation(mouse, $avatarCamera);
	}


	function onTouchMove(event: TouchEvent) {
		const touch = event.touches[0];
		const canvasBounds = canvas.getBoundingClientRect();
		mouse.x = ((touch.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
		mouse.y = -((touch.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;
		updateHeadRotation(mouse, $avatarCamera);
		
	}


</script>

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
