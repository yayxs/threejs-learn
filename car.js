/**
 * 模型加载器 gl传输格式 GLTFLoader.js
 * 材质 Materrial 材质赋给汽车模型 汽车颜色的修改
 * 模拟行驶 骑车车轮的原地旋转 加 地面网格线的移动实现
 *
 */

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
/**
 * 创建场景
 */
let scene, renderer, camera

// 灯光相关
let directionalLight, dhelper, hemisphereLight, hHelper
// 模型相关
let controls

// 轮子数组
const wheels = []

let loadingWidth = 0,
  isLoading = true
// 相机的默认坐标
const defaultMap = {
  x: 510,
  y: 128,
  z: 0
}

const map = { ...defaultMap }

function setScene() {
  scene = new THREE.Scene()
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
}
/**
 * 创建相机
 */

function setCamera() {
  const { x, y, z } = defaultMap
  camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 1000)
  camera.position.set(x, y, z)
}

/**
 * 设置灯光
 */

function setLight() {
  directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight.position.set(-4, 8, 4)
  dhelper = new THREE.DirectionalLightHelper(directionalLight, 5, 0xff0000)
  hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.4)
  hemisphereLight.position.set(0, 8, 0)
  hHelper = new THREE.HemisphereLightHelper(hemisphereLight, 5)
  scene.add(directionalLight)
  scene.add(hemisphereLight)
}

/**
 * 设置模型控制
 */
const render = () => {
  map.x = Number.parseInt(camera.position.x)
  map.y = Number.parseInt(camera.position.y)
  map.z = Number.parseInt(camera.position.z)
}

function setControls() {
  controls = new OrbitControls(camera, renderer.domElement)
  controls.maxPolarAngle = (0.9 * Math.PI) / 2
  controls.enableZoom = true
  controls.addEventListener('change', render)
}

/**
 * 加载文件
 * @param {*} url
 */
function loadFile(url) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader()
    loader.load(
      url,
      (gltf) => {
        resolve(gltf)
      },
      (params) => {
        console.log('---', params)
        const { loaded, total } = params
        let load = Math.abs((loaded / total) * 100)
        loadingWidth = load

        if (load >= 100) {
          setTimeout(() => {
            isLoading = false
          }, 1000)
        }
        console.log(`${(loaded / total) * 100}% loaded`)
      },
      (err) => {
        console.log('123', err)
        reject(err)
      }
    )
  })
}

const init = async () => {
  setScene() // 设置场景
  setCamera() // 设置相机
  setLight() // 设置灯光
  setControls()
  const gltf = await loadFile('./tesla_2018_model_3.glb') // 加载模型
  console.log('加载的模型是', gltf)
  const carModel = gltf.scene.children[0]
  console.log('加载的车模型是', carModel)
  wheels.push(
    carModel.getObjectByName('wheels_wheels0_0'),
    carModel.getObjectByName('wheels_wheels1_0'),
    carModel.getObjectByName('wheels_wheels2_0'),
    carModel.getObjectByName('wheels_wheels3_0'),
    carModel.getObjectByName('wheels_wheels4_0'),
    carModel.getObjectByName('wheels_wheels6_0'),

    carModel.getObjectByName('wheels001_wheels0_0'),
    carModel.getObjectByName('wheels001_wheels1_0'),
    carModel.getObjectByName('wheels001_wheels2_0'),
    carModel.getObjectByName('wheels001_wheels3_0'),
    carModel.getObjectByName('wheels001_wheels4_0'),

    carModel.getObjectByName('wheels001_wheels6_0')
  )
  console.log('轮子数组', wheels)

  carModel.traverse((node) => {
    if (node.name.includes('wheels')) {
      console.log('===', node.name)
    }
  })
  scene.add(gltf.scene)
  animate() // 不停调用
}

/**
 * 不停调用
 */
const animate = () => {
  requestAnimationFrame(animate)
  const time = -performance.now() / 1000
  for (let i = 0; i < wheels.length; i++) {
    wheels[i].rotation.x = time * Math.PI * 2
  }
  renderer.render(scene, camera)

  controls.update()
}

init()
