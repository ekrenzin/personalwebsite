import { writable, get } from "svelte/store";
import { Scene,  Object3D,  Camera, WebGLRenderer, AmbientLight, DirectionalLight} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

const avatarHeadPositionBase = { x: Math.PI/12, y: 0, z: 0 };

const avatarScene = writable<Scene>();
const avatarModel = writable<GLTF>();
const avatarCamera = writable<Camera>();
const avatarRenderer = writable<WebGLRenderer>();
const avatarLights = writable<Object3D>();

avatarScene.subscribe((scene) => {
    if (!scene) return;
    const lights = loadLights(scene);
    loadAvatar(scene, lights);
    
    scene.add(lights);
})

avatarModel.subscribe((model) => {
    if (!model) return; 
    const scene = get(avatarScene);
    if (!scene) return;

    // Hide and remove the hands
    const leftHand = model.scene.getObjectByName('LeftHand');
    const rightHand = model.scene.getObjectByName('RightHand');

    if (!leftHand || !rightHand) return;

    leftHand.position.set(0, 0, 100);
    rightHand.position.set(0, 0, 100);
});

function loadAvatar(scene: THREE.Scene, lights: THREE.Object3D) {
    const loader = new GLTFLoader();
    loader.load(
        './my_head.glb',
        function (gltf: GLTF) {
            gltf.scene.position.y = -5.7;
            gltf.scene.position.z = -1;
            gltf.scene.position.x = 0.25;

            gltf.scene.scale.set(8, 8, 8);
            avatarModel.set(gltf);
            scene.add(gltf.scene);

            try {
                //point the lights at the head
                const head = gltf.scene.getObjectByName('Head');
                if (!head) return;
                lights.lookAt(head.position);
                head.rotation.set(avatarHeadPositionBase.x, avatarHeadPositionBase.y, avatarHeadPositionBase.z);
            } catch (error) {
                console.log(error);
            }
        },
        undefined,
        function (error) {
            console.error(error);
        }
    );
}

function loadLights(scene: Scene) {
    const ambientLight = new AmbientLight(0xffffff);
    const directionalLight = new DirectionalLight(0xffffff, 2);
    const lightsGroup = new Object3D();

    directionalLight.position.set(3, 2, -2);

    lightsGroup.add(ambientLight);
    lightsGroup.add(directionalLight);
    avatarLights.set(lightsGroup);

    return lightsGroup;
}

export { avatarScene, avatarModel, avatarCamera, avatarRenderer, loadAvatar, loadLights, avatarHeadPositionBase };