<script>
  import * as THREE from 'three'
  import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js'
  import { XRHandModelFactory } from 'three/examples/jsm/webxr/XRHandModelFactory.js'

  export let autoPlay = true, autoCode= false
  let sceneContainer, video, enterSceneButton
  let camera, scene, renderer, desktop

  const LINE_COUNT = 5000
  const accelerationOne = 0.03
  const accelerationTwo = 0.035

  let geom = new THREE.BufferGeometry()
  geom.setAttribute(
    'position',
    new THREE.BufferAttribute(new Float32Array(6 * LINE_COUNT), 3),
  )
  geom.setAttribute(
    'velocity',
    new THREE.BufferAttribute(new Float32Array(2 * LINE_COUNT), 1),
  )

  let position = geom.getAttribute('position')
  let positionArray = position.array
  let velocity = geom.getAttribute('velocity')
  let velocityArray = velocity.array

  function loadedScript() {
    if (!window.DesktopVision) {
      console.log('Desktop Vision JS SDK not loaded')
      //try again in 1 second
      setTimeout(loadedScript, 1000)
      return
    }
    console.log('Loaded the Desktop Vision JS SDK')
    const { ManagedComputer } = window.DesktopVision.loadSDK(
      THREE,
      XRControllerModelFactory,
      XRHandModelFactory,
    )
    loadThreeAutomatedExample(ManagedComputer)
  }

  const desktopVisionApiCredentials = {
    id: '6wlqRxEgp60JXkcGkLY2',
    key: 'bc7013db-c339-4141-92fb-f24486d47d35',
  }

  function loadThreeAutomatedExample(ManagedComputer) {
    scene = new THREE.Scene()
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    camera = new THREE.PerspectiveCamera()
    camera.position.set(0, 1.6, 0)

    loadRenderer(renderer, time => renderer.render(scene, camera))
    windowResizeEventListener(camera, renderer)

    const desktopOptions = {
      scene,
      camera,
      sceneContainer,
      renderer,
      video,
      hideMoveIcon: false,
      hideResizeIcon: true,
      includeKeyboard: true,
      hideMultiMonitor: true,
    }
    desktop = new ManagedComputer(desktopOptions, desktopVisionApiCredentials)
    scene.add(desktop)
    desktop.transparent = false
    desktop.position.y = 1.6
    desktop.position.z = -0.8
    desktop.resetScreen()
    window.desktop = desktop
    
    video.preload = 'auto'
    video.setAttribute('crossorigin', 'anonymous')

    if (autoPlay) {
      video.src =
        'https://desktop-vision-resources.s3.us-west-1.amazonaws.com/get_started_fx.mp4'
      video.addEventListener('play', event => {
        desktop.resetVideo()
      })
    }
    if (autoCode) {
      desktop.generateCode()
    }
    init()
  }

  function windowResizeEventListener() {
    const sceneBounds = sceneContainer.getBoundingClientRect()
    const { width, height } = sceneBounds
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width - 4, height - 4)
  }

  function loadRenderer(renderer, renderLoop) {
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    renderer.shadowMap.enabled = true
    renderer.xr.enabled = true
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.localClippingEnabled = true
    renderer.xr.setFramebufferScaleFactor(2.0)
    renderer.outputEncoding = THREE.sRGBEncoding

    renderer.setAnimationLoop(renderLoop)
    sceneContainer.appendChild(renderer.domElement)
  }

  function init() {
    for (let lineIndex = 0; lineIndex < LINE_COUNT; lineIndex++) {
      const x = Math.random() * 400 - 200
      const y = Math.random() * 200 - 100
      const z = Math.random() * 500 - 100

      const xEnd = x
      const yEnd = y
      const zEnd = z

      //line start
      positionArray[6 * lineIndex] = x
      positionArray[6 * lineIndex + 1] = y
      positionArray[6 * lineIndex + 2] = z

      //line end
      positionArray[6 * lineIndex + 3] = xEnd
      positionArray[6 * lineIndex + 4] = yEnd
      positionArray[6 * lineIndex + 5] = zEnd

      velocityArray[2 * lineIndex] = velocityArray[2 * lineIndex + 1] = 0
    }
    //debugger;
    //randomly choose one of three colors
    let mat = new THREE.LineBasicMaterial({ color: 0x0091bf })
    let lines = new THREE.LineSegments(geom, mat)
    scene.add(lines)
    animate()
  }

  function animate() {
    for (let lineIndex = 0; lineIndex < LINE_COUNT; lineIndex++) {
      //accelerate as the line gets closer to the end
      velocityArray[2 * lineIndex] += accelerationOne
      velocityArray[2 * lineIndex + 1] += accelerationTwo

      //move the line closer to the end
      positionArray[6 * lineIndex + 2] += velocityArray[2 * lineIndex] //z
      positionArray[6 * lineIndex + 5] += velocityArray[2 * lineIndex + 1] //z

      //reset the line if it goes off screen
      if (positionArray[6 * lineIndex + 5] > 200) {
        var z = Math.random() * 200 - 100
        positionArray[6 * lineIndex + 2] = z
        positionArray[6 * lineIndex + 5] = z
        velocityArray[2 * lineIndex] = 0
        velocityArray[2 * lineIndex + 1] = 0
        console.log
      }
    }

    position.needsUpdate = true
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
  }

  function restartScene() {
    desktop.rotation.x = 0
    desktop.rotation.y = 0
    desktop.rotation.z = 0

    desktop.position.y = 1.6
    desktop.position.z = -0.8
    desktop.position.x = 0

    desktop.resetScreen()

    video.pause()
    video.currentTime = 0
    video.load()
  }
</script>

<style>
  section {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 0;
    overflow: visible;
    justify-content: center;
  }

  .scene {
    width: 100%;
    height: 900px;
  }

  @media (max-width: 1400px) {
    .scene {
      height: 800px;
    }
  }

  @media (max-width: 1200px) {
    .scene {
      height: 700px;
    }
  }

  @media (max-width: 1000px) {
    .scene {
      height: 600px;
    }
  }

  @media (max-width: 800px) {
    .scene {
      height: 500px;
    }
  }

  @media (max-width: 600px) {
    .scene {
      height: 400px;
    }
  }

  @media (max-width: 500px) {
    .scene {
      height: 300px;
    }
  }
  @media (max-width: 425px) {
    .scene {
      height: 275px;
    }
  }
  @media (max-width: 300px) {
    .scene {
      height: 200px;
    }
  }

  h1 {
    margin: auto;
    font-weight: 300;
    font-size: 2rem;
  }
  p {
    max-width: 500px;
    margin: auto;
    margin-bottom: 20px;
    font-weight: 300;
    text-align: center;
  }

  .interactive-info {
    padding: 5%;
    text-align: center;
  }
</style>

<svelte:head
  ><script
    src="https://js.desktop.vision/three/v3.0.1/bundle.min.js"
    on:load={loadedScript}></script></svelte:head>

<svelte:window on:resize={windowResizeEventListener} />
<section id="dv-js-sdk-demo">
  <div class="scene" bind:this={sceneContainer} />
  <video
    bind:this={video}
    autoplay
    muted
    playsinline
    style="display: none"
    loop />
    <div class="interactive-info">
  <h1>The computer is interactive</h1>
  <p>
    Try clicking on the computer above this text, and then moving it using the move icon. You can even control
    your own computer from this page! Watch the video playing on the computer to
    learn how.
  </p>
  <button
    class="solid-button"
    style="margin:auto; font-family: Poppins"
    on:click={restartScene}>
    Reset
  </button>
</div>
</section>
