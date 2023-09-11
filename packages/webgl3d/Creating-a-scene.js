import * as THREE from 'three'

// 创建3D场景对象
const scene = new THREE.Scene()
// 创建一个长方体
const geometry = new THREE.BoxGeometry(100, 100, 100)
// 一个以简单着色（平面或线框）方式来绘制几何体的材质 材质不受光照的影响
// 物体的外观 材质
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000 //0xff0000设置材质颜色为红色
})
// 物体 网格的模型 一个箱子、一个鼠标
const mesh = new THREE.Mesh(geometry, material) // 物体的形状 物体的外观

// 物体的位置
mesh.position.set(0, 10, 0) // 默认是坐标的原点

/**
 * 物体的虚拟对象
 * 添加到三维场景中
 */

scene.add(mesh)

/**
 * CapsuleGeometry
 */

// // 相机 透视摄像机 （ 视野角度，长宽比，近截面，远截面 ）
// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// )
// // 渲染器
// const renderer = new THREE.WebGLRenderer()

// // 立方体
// const geometry = new THREE.BoxGeometry(1, 1, 1)

// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }) // 设置颜色属性

// const cube = new THREE.Mesh(geometry, material) // 需要一个网格
// scene.add(cube) // 物体添加到 （0,0,0,）坐标

// camera.position.z = 5
// // 摄像机渲染出场景
// // 浏览器窗口宽高
// renderer.setSize(window.innerWidth, window.innerHeight)

// document.body.appendChild(renderer.domElement)

// function animate() {
//   requestAnimationFrame(animate)
//   cube.rotation.x += 0.01
//   cube.rotation.y += 0.01
//   renderer.render(scene, camera)
// }
// animate()
