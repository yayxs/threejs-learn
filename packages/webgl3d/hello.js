import * as THREE from 'three'

// 创建3D场景对象
const scene = new THREE.Scene()
// 创建一个长方体

// const geometry = new THREE.BoxGeometry(100, 100, 100)
const geometry = new THREE.BoxGeometry(100, 60, 10)

// 一个以简单着色（平面或线框）方式来绘制几何体的材质 材质不受光照的影响
// 物体的外观 材质
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000, //0xff0000设置材质颜色为红色
  transparent: true, //开启透明
  opacity: 0.5 //设置透明度
})
// 物体 网格的模型 一个箱子、一个鼠标
const mesh = new THREE.Mesh(geometry, material) // 物体的形状 物体的外观

// 物体的位置
mesh.position.set(50, 0, 0) // 默认是坐标的原点
// mesh.position.set(0, 10, 0) // 默认是坐标的原点

/**
 * 物体的虚拟对象
 * 添加到三维场景中
 */

scene.add(mesh)

// 添加坐标系
const ax = new THREE.AxesHelper(150)

scene.add(ax)

/**
 * 透视的投影相机 本质是模拟人眼观察这个世界
 * 只有视锥体之内的才能看见
 */
const width = 800
const height = 500
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000)

// 设置相机的位置信息 xyz 的坐标 200 200 200
// camera.position.set(200, 400, 200)
// camera.position.set(200, 400, 200)
// camera.position.set(200, 400, 200)
camera.position.set(-1000, 0, 0)
camera.lookAt(0, 0, 0) // 指向mesh 对应的位置

// 相机对准备的目标 3D中某个位置

// camera.lookAt(0, 0, 0)

// camera.lookAt(0, 10, 0) // y轴上的位置10

// 相机相对长方体的位置信息
const renderer = new THREE.WebGLRenderer()
// 渲染区域的尺寸
renderer.setSize(width, height)

renderer.render(scene, camera)

// 获取渲染的画布

const app1 = document.getElementById('app-1')

app1.appendChild(renderer.domElement)
