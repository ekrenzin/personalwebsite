(() => {
    console.log("Loaded Three.js Scene");

    const myScriptTag = document.currentScript;
    const myScriptId = myScriptTag.id.split("script-")[1];
    const selector = 'canvas-' + myScriptId;

    let scene, camera, renderer;
    let cube;

    function init() {
        // Get the container
        let container = document.getElementById(selector);
        if (!container) {
            console.error(`No element with id ${selector} found.`);
            return;
        }
        console.log(`Found element with id ${selector}.`);

        // Scene setup
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        container.appendChild(renderer.domElement);

        // Cube setup
        let geometry = new THREE.BoxGeometry();
        let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        // Handle window resize
        window.addEventListener('resize', onWindowResize, false);
    }

    function onWindowResize() {
        let container = document.getElementById(selector);
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
    }

    function animate() {
        requestAnimationFrame(animate);

        // Rotation
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
    }

    init();
    animate();
})();
