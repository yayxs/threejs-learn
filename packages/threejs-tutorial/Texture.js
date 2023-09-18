import {
  BoxGeometry,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  TextureLoader,
  TorusGeometry,
  WebGLRenderer,
  MeshBasicMaterial,
  Mesh
} from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

let renderer

let camera

let scene

let controls
function init() {
  const container = document.getElementById('app')
  renderer = new WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0xffffff, 1.0)
  renderer.setAnimationLoop(render)
  container.appendChild(renderer.domElement)
  window.addEventListener('resize', () => {
    // 相机响应
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    // 重新设置渲染器
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0xffffff, 1)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  })

  // 常见球体
  const qiuti = new SphereGeometry(0.5, 16, 16)
  // 立方体
  const lifangti = new BoxGeometry(1, 1, 1)
  // 圆环几何体
  const yuanhuan = new TorusGeometry(0.3, 0.15, 16, 32)
  /**
   * 纹理 物体光滑表面上的彩色图案 加载贴图
   */
  const loader = new TextureLoader()
  const text = loader.load('/grass.png')
  scene = new Scene()
  camera = new PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  )
  camera.position.set(10, 10, 10)
  controls = new OrbitControls(camera, renderer.domElement)
  controls.addEventListener('change', () => {
    console.log('相机的位置', camera.position)
  })
  // 材质
  const meshBasicMaterial = new MeshBasicMaterial({
    map: text, // 颜色贴图
    color: 0x00ff00
  }) // 简单的材质

  const box = new BoxGeometry(8, 8, 8)
  const mesh = new Mesh(box, meshBasicMaterial)
  scene.add(mesh)
}

function render() {
  controls.update()
  renderer.render(scene, camera)
}

init()
