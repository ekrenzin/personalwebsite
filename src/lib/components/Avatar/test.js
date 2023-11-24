
function updateWalkingAnimation(delta: number) {
    if (!isWalking) return;
    if (!avatarModel) return;

    const time = clock.getElapsedTime();
    const speed = 5; // Speed of the walking animation

    // Sine and cosine functions for smooth oscillation
    const sineWave = Math.sin(time * speed);
    const cosineWave = Math.cos(time * speed);

    // Adjust arm and leg bones for walking
    const leftArm = avatarModel.getObjectByName('LeftArm');
    const leftForeArm = avatarModel.getObjectByName('LeftForeArm');
    const rightArm = avatarModel.getObjectByName('RightArm');
    const rightForeArm = avatarModel.getObjectByName('RightForeArm');
    const leftUpLeg = avatarModel.getObjectByName('LeftUpLeg');
    const leftLeg = avatarModel.getObjectByName('LeftLeg');
    const rightUpLeg = avatarModel.getObjectByName('RightUpLeg');
    const rightLeg = avatarModel.getObjectByName('RightLeg');
    const leftFoot = avatarModel.getObjectByName('LeftFoot');
    const rightFoot = avatarModel.getObjectByName('RightFoot');

    if (leftArm && rightArm && leftUpLeg && rightUpLeg) {
        // Arm swing - opposite to the legs
        // leftArm.rotation.x = THREE.MathUtils.degToRad(85 + (15 * cosineWave));
        // rightArm.rotation.x = THREE.MathUtils.degToRad(85 + (15 * sineWave));

        // Leg movement
        leftUpLeg.rotation.x = THREE.MathUtils.degToRad(15 * sineWave);
        rightUpLeg.rotation.x = THREE.MathUtils.degToRad(15 * cosineWave);

        // Adjust other parts as needed for a more natural movement
    }
}


function relaxAvatar(gltf: any) {
    const skeleton = new THREE.SkeletonHelper(gltf.scene);

    // Adjust arm bones
    const leftArm = skeleton.bones.find((bone) => bone.name === 'LeftArm');
    const leftForeArm = skeleton.bones.find((bone) => bone.name === 'LeftForeArm');
    const rightArm = skeleton.bones.find((bone) => bone.name === 'RightArm');
    const rightForeArm = skeleton.bones.find((bone) => bone.name === 'RightForeArm');

    console.log('relax arm bones');
    // Example: Rotate arms to a relaxed position
    leftArm.rotation.x = THREE.MathUtils.degToRad(85);
    leftForeArm.rotation.z = THREE.MathUtils.degToRad(15);
    leftForeArm.rotation.x = THREE.MathUtils.degToRad(15);

    rightArm.rotation.x = THREE.MathUtils.degToRad(85);
    rightForeArm.rotation.z = THREE.MathUtils.degToRad(-35);
    rightForeArm.rotation.x = THREE.MathUtils.degToRad(15);

    // Adjust leg bones
    console.log('relax leg bones');
    const leftUpLeg = skeleton.bones.find((bone) => bone.name === 'LeftUpLeg');
    const leftLeg = skeleton.bones.find((bone) => bone.name === 'LeftLeg');
    const rightUpLeg = skeleton.bones.find((bone) => bone.name === 'RightUpLeg');
    const rightLeg = skeleton.bones.find((bone) => bone.name === 'RightLeg');

    leftUpLeg.rotation.y = THREE.MathUtils.degToRad(15);
    leftLeg.rotation.x = THREE.MathUtils.degToRad(-15);
    rightUpLeg.rotation.x = THREE.MathUtils.degToRad(15);
    rightLeg.rotation.x = THREE.MathUtils.degToRad(-15);

    //Feet
    const leftFoot = skeleton.bones.find((bone) => bone.name === 'LeftFoot');
    const rightFoot = skeleton.bones.find((bone) => bone.name === 'RightFoot');

    leftFoot.rotation.x = THREE.MathUtils.degToRad(100);
    rightFoot.rotation.x = THREE.MathUtils.degToRad(100);
    startWalkingAnimation();
}

function startWalkingAnimation() {
    isWalking = true;
}

function stopWalkingAnimation() {
    isWalking = false;
}