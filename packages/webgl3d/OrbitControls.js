import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
const width = 800
const height = 500

/** 搭建一个场景 */
const scene = new THREE.Scene()

/** 物体的形状 */
const geometry = new THREE.BoxGeometry(100, 100, 100)
/** 物体的外观 */
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000, //0xff0000设置材质颜色为红色
  transparent: true, //开启透明
  opacity: 0.5 //设置透明度
})
/** 创建物体 */
const mesh = new THREE.Mesh(geometry, material)
/** 物体在哪 */
mesh.position.set(50, 0, 0)
scene.add(mesh)

/** 创建坐标系 */
const ax = new THREE.AxesHelper(150) // 1 轴的线段长度 用于简单模拟3个坐标轴的对象.

/** 创建点光源 场景内  */
const pointLight = new THREE.PointLight(0xff0000, 1, 100) // 白光、光照强度、
pointLight.position.set(300, 300, 300)

const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000)

camera.position.set(300, 300, 300)

camera.lookAt(mesh.position)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 10)
scene.add(pointLightHelper)

scene.add(ax)
scene.add(pointLight)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
renderer.render(scene, camera)

const controls = new OrbitControls(camera, renderer.domElement)

controls.addEventListener('change', function () {
  // 浏览器控制台查看相机位置变化
  console.log('camera.position', camera.position)
})

// let i = 0
// function render() {
//   i += 1
//   console.log('执行次数', i)
//   // window.requestAnimationFrame(render)
// }
// render()

const dom = document.getElementById('app-1')
dom.appendChild(renderer.domElement)
function render() {
  renderer.render(scene, camera) //执行渲染操作
  mesh.rotateY(0.01) //每次绕y轴旋转0.01弧度
  requestAnimationFrame(render) //请求再次执行渲染函数render，渲染下一帧
}
render()
