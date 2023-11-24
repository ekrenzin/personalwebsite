import { Vector3, Plane, Raycaster, Vector2, Object3D } from "three";
import { avatarModel, avatarHeadPositionBase } from "./AvatarScene";
import { get } from "svelte/store";
import { Tween } from '@tweenjs/tween.js';

let raycaster = new Raycaster();
let returnHeadTimeout: any;

function updateHeadRotation(mouse: Vector2, camera: THREE.Camera) {
    const model = get(avatarModel)?.scene;
    if (!model) return;
    const head = model.getObjectByName('Head');
    if (!head) return;


    raycaster.setFromCamera(mouse, camera);
    const planeNormal = new Vector3(0, 0, 1);
    const planePoint = model.position.clone();
    const targetPoint = new Vector3();
    raycaster.ray.intersectPlane(
        new Plane(planeNormal, planePoint.dot(planeNormal)),
        targetPoint
    );

    // if (targetPoint) neck.lookAt(targetPoint);
    if (targetPoint) {
        const originalHeadRotation = head.rotation.clone();
        head.lookAt(targetPoint);
        //this is the new head rotation that we want to tween to
        const newHeadRotation = head.rotation.clone();
        //set the head back to the original rotation
        head.rotation.copy(originalHeadRotation);
        // Tween for head
        new Tween(head.rotation)
            .to({ x: newHeadRotation.x, y: newHeadRotation.y, z: newHeadRotation.z }, 100)
            .start();
    }
    resetHeadRotationAfterDelay(head);
}


function resetHeadRotationAfterDelay(head: Object3D) {
    clearTimeout(returnHeadTimeout);
    returnHeadTimeout = setTimeout(() => {
        returnHeadToStartPosition(head);
    }, 1000); // 1 second delay
}

function returnHeadToStartPosition(head: Object3D) {
    if (!head) return;
    // Tween for head
    new Tween(head.rotation)
        .to(avatarHeadPositionBase, 200) // Duration of 1 second
        .start();

}

export { updateHeadRotation };