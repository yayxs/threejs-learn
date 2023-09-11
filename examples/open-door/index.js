import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
let scene
let renderer
let camera
let controls

let carModel // 车本身
let doors = [] // 车门
let wheels = [] // 车轮子

let 车架子材质

const init = () => {
  const container = document.getElementById('app')
  renderer = new THREE.WebGLRenderer({
    antialias: true
  })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setAnimationLoop(render)
  container.appendChild(renderer.domElement)
  window.addEventListener('resize', onWindowResize)
  // fov : Number, aspect : Number, near : Number, far : Number
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  )
  // camera.position.set(4.25, 1.4, -4.5)
  // camera.position.set(0, 0, -4.5)

  controls = new OrbitControls(camera, container)
  // controls.maxDistance = 9
  // controls.maxPolarAngle = THREE.MathUtils.degToRad(90)
  // controls.target.set(0, 0.5, 0)
  controls.update()

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x333333)

  let ambientLight = new THREE.AmbientLight('#ffffff', 20)
  scene.add(ambientLight)
  const axesHelper = new THREE.AxesHelper(2)
  scene.add(axesHelper)
  /** 材质 */
  车架子材质 = new THREE.MeshPhysicalMaterial({
    metalness: 1.0,
    roughness: 0.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    sheen: 0.5
  }) //
  const loader = new GLTFLoader() // 加载器对象
  loader.load('./benchi.glb', (gltf) => {
    console.log('glb文件对象结构', gltf) // 包含模型信息
    carModel = gltf.scene
    let 磨砂框架 = carModel.getObjectByName('磨砂框架')
    let 车门 = carModel.getObjectByName('车门')
    磨砂框架.traverse((model) => {
      console.log(model)
    })
    carModel.scale.set(0.03, 0.03, 0.03)
    // carModel.position.set(0, 0.25, 0)
    scene.add(carModel)
  })
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}
function render() {
  controls.update()
  renderer.render(scene, camera)
}

init()
