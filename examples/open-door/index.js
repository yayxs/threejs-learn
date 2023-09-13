import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'
import {
  CSS2DRenderer,
  CSS2DObject
} from 'three/addons/renderers/CSS2DRenderer.js'
import * as TWEEN from '@tweenjs/tween.js'
let scene
let renderer
let camera
let controls

let carModel // 车本身
let doors = [] // 车门
let wheels = [] // 车轮子
let topRightDoorOpen = false

let 车身的材质
let glassMaterial // 玻璃的材质
let detailsMaterial

let labelRenderer // label标记
let gui

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

  labelRenderer = new CSS2DRenderer()
  labelRenderer.setSize(window.innerWidth, window.innerHeight)
  labelRenderer.domElement.style.position = 'absolute'
  labelRenderer.domElement.style.top = '0px'
  // labelRenderer.domElement.style.pointerEvents = 'none'
  document.body.appendChild(labelRenderer.domElement)
  // container.appendChild(labelRenderer.domElement)

  // fov : Number, aspect : Number, near : Number, far : Number
  // camera = new THREE.PerspectiveCamera(
  //   50,
  //   window.innerWidth / window.innerHeight,
  //   0.1,
  //   2000
  // )
  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
  )
  // camera.position.set(6, 0, 0)
  camera.position.set(4.25, 1.4, -4.5)

  // controls = new OrbitControls(camera, container) // 轨道控制器使相机轨道运动
  // controls.maxDistance = 9 // 相机向外移动多少
  // const maxPolarAngle = THREE.MathUtils.degToRad(90)
  // console.log('数学函数，将度数转为弧度', maxPolarAngle)
  // controls.maxPolarAngle = maxPolarAngle //
  // controls.target.set(0, 0.5, 0)
  // controls.enableZoom = true // 启用禁用相机的缩放
  // controls.update()

  // controls = new OrbitControls(camera, container)

  controls = new OrbitControls(camera, labelRenderer.domElement)
  controls.enableDamping = true
  controls.maxDistance = 9
  controls.target.set(0, 0.5, 0)
  // controls = new OrbitControls(camera, renderer.domElement)

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x333333)
  scene.environment = new RGBELoader().load(
    '/textures/equirectangular/venice_sunset_1k.hdr'
  )
  scene.environment.mapping = THREE.EquirectangularReflectionMapping
  scene.fog = new THREE.Fog(0x333333, 10, 15)

  let ambientLight = new THREE.AmbientLight('#ffffff', 40)
  scene.add(ambientLight)
  const axesHelper = new THREE.AxesHelper(2)
  scene.add(axesHelper)

  /** 材质 */
  车身的材质 = new THREE.MeshPhysicalMaterial({
    color: '#6e2121', //
    metalness: 1.0,
    roughness: 0.5,
    clearcoat: 1.0, // 默认0.0
    clearcoatRoughness: 0.03, // clear coat层的粗糙度，由0.0到1.0。 默认为0.0
    sheen: 0.5 // 范围是0.0到1.0。默认为0.0。
  })
  glassMaterial = new THREE.MeshPhysicalMaterial({
    color: '#793e3e',
    metalness: 0.25,
    roughness: 0,
    transmission: 1.0
    // color: 0xffffff,
    // metalness: 0.25,
    // roughness: 0,
    // transmission: 1.0
  })
  detailsMaterial = new THREE.MeshStandardMaterial({
    color: '#6c6c6c',
    metalness: 1.0,
    roughness: 0.5
  })

  /** 右前门的2D label */
  const rightFrontDoorDiv = document.createElement('div')
  rightFrontDoorDiv.className = 'status right-front'
  rightFrontDoorDiv.style.pointerEvents = 'auto'

  const solid = document.createElement('div')
  solid.className = 'solid'
  const animate1 = document.createElement('div')
  animate1.className = 'animate1'
  const animate2 = document.createElement('div')
  animate2.className = 'animate2'
  rightFrontDoorDiv.appendChild(solid)
  rightFrontDoorDiv.appendChild(animate1)
  rightFrontDoorDiv.appendChild(animate2)
  rightFrontDoorDiv.addEventListener('click', () => {
    // CSS2DObject 元素 点击
    // https://blog.csdn.net/weixin_45692986/article/details/126547660?ydreferer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS5oay8%3D
    openDoor()
  })
  const rightFrontLabel = new CSS2DObject(rightFrontDoorDiv)
  rightFrontLabel.position.set(0.8, 0.7, -1.2)

  scene.add(rightFrontLabel)

  const loader = new GLTFLoader() // 加载器对象
  loader.load('./benchi.glb', (gltf) => {
    console.log('glb文件对象结构', gltf) // 包含模型信息
    carModel = gltf.scene
    let 磨砂框架 = carModel.getObjectByName('磨砂框架')
    let 车门 = carModel.getObjectByName('车门')
    磨砂框架.traverse((model) => {
      model.material = 车身的材质
    })

    车门.traverse((model) => {
      // console.log('车门', model.name)
      const doorName = model.name

      if (doorName.indexOf('_skl') > 0) {
        // 车门上的玻璃
        model.material = glassMaterial
      } else if (
        doorName.indexOf('_tex') > 0 ||
        doorName.indexOf('_gum') > 0 ||
        doorName.indexOf('_chr') > 0
      ) {
        model.material = detailsMaterial
      } else {
        model.material = 车身的材质
        if (
          doorName == 'DLP' ||
          doorName == 'DLZ' ||
          doorName == 'DPP' ||
          doorName == 'DPZ'
        ) {
          doors.push(model) // 车门数组
        }
      }
    })

    let 车身 = carModel.getObjectByName('车身')
    车身.traverse((model) => {
      if (model.name.indexOf('_skl') > 0) {
        // 车身上的挡风玻璃
        model.material = glassMaterial
      } else {
        model.material = detailsMaterial // 车身上的一些其他细节
      }
    })
    const shadow = new THREE.TextureLoader().load('/models/ferrari_ao.png')
    // const mesh = new THREE.Mesh(
    //   new THREE.PlaneGeometry(0.655 * 4, 1.3 * 4),
    //   new THREE.MeshBasicMaterial({
    //     map: shadow,
    //     blending: THREE.MultiplyBlending,
    //     toneMapped: false,
    //     transparent: true
    //   })
    // )
    // mesh.rotation.x = -Math.PI / 2
    // mesh.renderOrder = 2
    // carModel.add(mesh)
    carModel.scale.set(0.03, 0.03, 0.03)
    carModel.position.set(0, 0.25, 0)
    scene.add(carModel)
    setupDatGui()
  })
}

function setupDatGui() {
  gui = new GUI()
  const bc = {
    车身颜色: '#6e2121',
    opacity: 1
  }
  const gc = {
    玻璃颜色: '#aaaaaa',
    opacity: 1
  }
  const dc = {
    细节颜色: '#6c6c6c',
    opacity: 1
  }
  gui.addColor(bc, '车身颜色').onChange(() => {
    console.log(车身的材质.color)
    车身的材质.color.set(bc.车身颜色)
  })
  gui.addColor(dc, '细节颜色').onChange(function () {
    detailsMaterial.color.set(dc.细节颜色)
  })
  gui.addColor(gc, '玻璃颜色').onChange(() => {
    glassMaterial.color.set(gc.玻璃颜色)
  })
}

const setupTweenDoor = (pos, target, mesh) => {
  // 参数1 起点的位置
  // 参数2 1000ms
  const carTween = new TWEEN.Tween(pos)
  carTween.to(target, 1400).easing(TWEEN.Easing.Quadratic.Out)
  carTween.onUpdate((object) => {
    // console.log('object', object)
    mesh.rotation.z = object.z
  })
  // 启动一下
  carTween.start()
}

/** 开门 */
const openDoor = () => {
  // console.log('点击的是门', doors)

  // 取到左门和右边的门
  let leftDoors = [],
    rightDoors = []
  // dlp 左前门 dlz 左后门 dpp右前门 dpz 右后门
  const len = doors.length
  for (let i = 0; i < len; i++) {
    const door = doors[i]
    if (door.name === 'DLP' || door.name === 'DLZ') {
      // 左边的门
    }

    if (door.name === 'DPP' || door.name === 'DPZ') {
      // 右边的门
      console.log('点击的是右边的门', door)
      setupTweenDoor({ z: 0 }, { z: Math.PI * -0.4 }, door)
    }
  }
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
  labelRenderer.setSize(window.innerWidth, window.innerHeight)
}
function render() {
  TWEEN.update() // 主函数中调用 TWEEN.update

  controls.update()
  renderer.render(scene, camera)
  labelRenderer.render(scene, camera)
}

init()

function domClick(event) {
  const rayCaster = new THREE.Raycaster()
  console.log('相机的位置', camera.position)
  console.log('控制器的位置', controls.target)
  // 鼠标的位置
  const vector = new THREE.Vector2(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1
  )
  rayCaster.setFromCamera(vector, camera)
  let intersects = rayCaster.intersectObjects(scene.children)
  console.log(intersects)
}
// document.addEventListener('click', domClick, false)
