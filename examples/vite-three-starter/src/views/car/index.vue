<script setup>
// https://github.com/mrdoob/three.js/blob/dev/examples/webgl_materials_car.html
// https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene
import * as THREE from 'three'
import Stats from 'three/addons/libs/stats.module.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'
import { onMounted } from 'vue'

let camera
let scene
let renderer
let stats

let grid
let controls

const wheels = [] // 轮子

const init = () => {
  /** 被渲染的元素 */
  const container = document.getElementById('container')
  console.log('--', container)
  renderer = new THREE.WebGLRenderer({ antialias: true }) // { antialias:true} 开启抗锯齿
  renderer.setPixelRatio(window.devicePixelRatio) // 设置设备像素比。通常用于避免HiDPI设备上绘图模糊
  // renderer.setSize(window.innerWidth, window.innerHeight) // 将输出canvas的大小调整为(width, height)并考虑设备像素比 375 667
  renderer.setSize(window.innerWidth, window.innerWidth) // 将输出canvas的大小调整为(width, height)并考虑设备像素比 375 667

  renderer.setAnimationLoop(render) // 每个可用帧都会调用的函数。 如果传入‘null’,所有正在进行的动画都会停止。
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 0.85
  container.appendChild(renderer.domElement)
  window.addEventListener('resize', onWindowResize) // 窗口变化
  // stats = new Stats()
  // container.appendChild(stats.dom) // fps 显示

  /** 透视相机（透视投影）来进行投影 */
  camera = new THREE.PerspectiveCamera(
    40,
    // window.innerWidth / window.innerHeight,
    window.innerWidth / window.innerWidth,

    0.1,
    100
  ) // 摄像机视锥体垂直视野角度50 摄像机视锥体长宽比1  摄像机视锥体近端面0.1  摄像机视锥体远端面2000
  camera.position.set(4.25, 1.4, -4.5)

  /** 可以使得相机围绕目标进行轨道运动  */
  controls = new OrbitControls(camera, container) // 将要被控制的相机 用于事件监听的HTML元素
  controls.maxDistance = 9 // 你能够将相机向外移动多少 Infinity
  controls.maxPolarAngle = THREE.MathUtils.degToRad(90) // 你能够垂直旋转的角度的上限，范围是0到Math.PI，其默认值为Math.PI
  controls.target.set(0, 0.5, 0)
  controls.update() // 更新控制器。必须在摄像机的变换发生任何手动改变后调用

  /**  */
  scene = new THREE.Scene() // 场景能够让你在什么地方、摆放什么东西来交给three.js来渲染，这是你放置物体、灯光和摄像机的地方。
  scene.background = new THREE.Color(0x333333) // 在渲染场景的时候将设置背景，且背景总是首先被渲染的
  const environment = new RGBELoader().load(
    '/textures/equirectangular/venice_sunset_1k.hdr'
  )
  // console.log('123', environment)
  scene.environment = environment // 则该纹理贴图将会被设为场景中所有物理材质的环境贴图
  scene.environment.mapping = THREE.EquirectangularReflectionMapping
  scene.fog = new THREE.Fog(0x333333, 10, 15) // 一个fog实例定义了影响场景中的每个物体的雾的类型

  /** 车辆 */
  const dracoLoader = new DRACOLoader() // 可选：提供DRACOLoader实例来解码压缩网格数据
  dracoLoader.setDecoderPath('/jsm/libs/draco/gltf/')
  const loader = new GLTFLoader() // 用于载入glTF 2.0资源的加载器
  loader.setDRACOLoader(dracoLoader) // HREE.DRACOLoader的实例，用于解码使用KHR_draco_mesh_compression扩展压缩过的文件。
  loader.load('/models/gltf/ferrari.glb', (gltf) => {
    console.log('car-gltf', gltf)
    const carModel = gltf.scene.children[0] // 取到车的模型

    scene.add(carModel)
  })
}

const render = () => {
  controls.update() // 更新控制器

  renderer.render(scene, camera)
}

const onWindowResize = () => {}

onMounted(() => {
  init()
})
</script>
<template>
  <div class="car-page">
    <div id="container"></div>
  </div>
</template>
<style lang="scss">
.car-page {
  width: 100vw;
  height: 100svh;
}
</style>
