import * as THREE from 'three'
let camera
let scene
let renderer
let labelRender

init()
animate()
function init() {
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    200
  )

  scene = new THREE.Scene()

  // 背景颜色
  // 灯光

  // 坐标
  const axesHelper = new THREE.AxesHelper(20)
  axesHelper.layers.enableAll()
  scene.add(axesHelper)

  // 渲染器
  renderer = new THREE.WebGLRenderer()
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
}

function size() {
  const WIDTH = window.innerWidth
  const HEIGHT = window.innerHeight

  const aspect = WIDTH / HEIGHT

  const ret = {
    aspect: aspect,
    WIDTH,
    HEIGHT
  }

  return ret
}

function onWindowResize() {
  const { aspect, WIDTH, HEIGHT } = size()
  camera.aspect = aspect
  camera.updateProjectionMatrix()
  renderer.setSize(WIDTH, HEIGHT)
  labelRender.setSize(WIDTH, HEIGHT)
}

function animate() {
  requestAnimationFrame(animate)

  renderer.render(scene, camera)
}
