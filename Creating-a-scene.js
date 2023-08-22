import * as THREE from 'three'

// 场景
const scene = new THREE.Scene()
// 相机 透视摄像机 （ 视野角度，长宽比，近截面，远截面 ）
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
// 渲染器
const renderer = new THREE.WebGLRenderer()

// 立方体
const geometry = new THREE.BoxGeometry(1, 1, 1)

const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }) // 设置颜色属性

const cube = new THREE.Mesh(geometry, material) // 需要一个网格
scene.add(cube) // 物体添加到 （0,0,0,）坐标

camera.position.z = 5
// 摄像机渲染出场景
// 浏览器窗口宽高
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

function animate() {
  requestAnimationFrame(animate)
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  renderer.render(scene, camera)
}
animate()
