import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  AxesHelper,
  AmbientLight,
  DirectionalLight,
  SpotLight,
  TextureLoader,
  Vector2,
  Raycaster
} from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
let scene
let camera
let controls
let renderer
function init() {
  renderer = new WebGLRenderer()
  // 设置渲染器
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0xffffff, 1)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  // 执行渲染
  renderer.setAnimationLoop(render)
  // 添加到dom中
  const dom = document.getElementById('app')
  dom.appendChild(renderer.domElement)

  // 添加响应式
  window.addEventListener('resize', () => {
    // 相机响应
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    // 重新设置渲染器
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0xffffff, 1)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  })
  // 相机
  camera = new PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    3000
  )
  camera.position.set(7.45, 1.71, 3.03)
  // 相机控制器
  controls = new OrbitControls(camera, renderer.domElement)
  controls.addEventListener('change', () => {
    console.log('相机的位置', camera.position)
  })
  // 场景
  scene = new Scene()
  // 辅助坐标
  const axesHelper = new AxesHelper(4)
  scene.add(axesHelper)

  // 环境光均匀照亮所有物体
  const huanjingguang = new AmbientLight(0x404040)
  scene.add(huanjingguang)
  // 平行光 类似太阳光
  const pingxingguang = new DirectionalLight(0xffffff, 1)
  // 设置光从是哪里照过来的
  pingxingguang.position.set(30, 30, 30)
  scene.add(pingxingguang)
  // 聚光灯
  const juguangdeng = new SpotLight(0xffffff, 10, 100, Math.PI / 4)
  juguangdeng.position.set(0, 5, 0)
  juguangdeng.castShadow = true // 投射阴影
  juguangdeng.shadow.bias = -0.002 // 减少阴影失真
  juguangdeng.shadow.mapSize.width = 4096
  juguangdeng.shadow.mapSize.height = 4096
  juguangdeng.map = new TextureLoader().load('/models/back.jpg')

  scene.add(juguangdeng)
  // 加载模型
  const loader = new GLTFLoader()
  loader.load('/models/Lamborghini.glb', (gltf) => {
    console.log('3d 模型', gltf)
    const carModel = gltf.scene

    scene.add(carModel)
  })
}

function render() {
  // 相机控制器更新
  controls.update()

  renderer.render(scene, camera)

  // 打印相机的位置
  // console.log('相机的位置', camera.position)
}

init()

window.addEventListener('click', (event) => {
  let point = {}

  point.x = (event.offsetX / window.innerWidth) * 2 - 1
  point.y = -(event.offsetY / window.innerHeight) * 2 + 1

  const ve = new Vector2(point.x, point.y) // 二位空间的点

  const ray = new Raycaster()
  ray.setFromCamera(ve, camera)
  let array = ray.intersectObjects(scene.children)
  const len = array.length
  for (let i = 0; i < len; i++) {
    // console.log('---', array[i])
    const name = array[i]['object']['name']
    // console.log('name', name)
    if (name === 'Object_64' || name === 'Object_77') {
      console.log('这点击的是车门', array[i])
    }
  }
})
