import * as THREE from 'three'
// 创建渲染器
const dom = document.getElementById('app-1')

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(100, 60, 20)

const material = new THREE.MeshBasicMaterial({
  color: 0xff0000, //0xff0000设置材质颜色为红色
  transparent: true, //开启透明
  opacity: 0.5 //设置透明度
})
// const material = new THREE.MeshBasicMaterial({
//   color: 0xff0000, //0xff0000设置材质颜色为红色
//   transparent: true, //开启透明
//   opacity: 0.5 //设置透明度
// })
/**
 * 创建材质
 * 让立方体反射光
 */

// const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 })

const m1 = new THREE.MeshLambertMaterial({
  color: 0x00ff00
}) //

const mesh = new THREE.Mesh(geometry, material) // 物体 物体描述
const ax = new THREE.AxesHelper(150)

const pointLight = new THREE.PointLight(0xffffff, 1, 0, 0)
pointLight.position.set(400, 0, 0) //点光源放在x轴上

scene.add(ax)
scene.add(mesh)
scene.add(pointLight) //点光源添加到场景中
const camera = new THREE.PerspectiveCamera(30, 800 / 500, 1, 3000)
camera.position.set(200, 200, 200)
camera.lookAt(0, 0, 0)
/**
 *  入参是对象 see https://threejs.org/docs/index.html#api/zh/renderers/WebGLRenderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(800, 500)
renderer.render(scene, camera)
dom.appendChild(renderer.domElement)

/**
 * 创建镜头 透视投影
 * 默认50 fov
 * 宽高比 aspect
 * 最近的距离 near 0.1
 * 最远的距离 far 2000
 */
// const camera = new THREE.PerspectiveCamera()

/**
 * 创建场景
 */
// const scene = new THREE.Scene()

/**
 * 创建几何体
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1) // 立方缓冲几何体
