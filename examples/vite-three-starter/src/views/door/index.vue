<script setup>
import * as THREE from 'three'
import Stats from 'three/addons/libs/stats.module.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'
import { onMounted } from 'vue'
import * as TWEEN from '@tweenjs/tween.js'
let camera
let scene
let renderer
let stats

let grid
let controls
let directionalLight, dhelper, hemisphereLight, hHelper
let doors
const init = () => {
  const container = document.getElementById('container')
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerWidth)
  renderer.setAnimationLoop(render)
  container.appendChild(renderer.domElement)
  // document.body.appendChild(render)

  camera = new THREE.PerspectiveCamera(
    60,
    // window.innerWidth / window.innerHeight,
    window.innerWidth / window.innerWidth,

    1,
    1000
  )
  camera.position.set(510, 128, 0)
  controls = new OrbitControls(camera, renderer.domElement)
  controls.maxPolarAngle = (0.9 * Math.PI) / 2
  controls.enableZoom = true
  scene = new THREE.Scene()
  setLight()
  const loader = new GLTFLoader()
  loader.load('/models/gltf/tesla_2018_model_3.glb', (gltf) => {
    console.log('123', gltf)
    const carModel = gltf.scene.children[0]
    console.log('车的模型是', carModel)
    doors = []
    carModel.traverse((model) => {
      if (model.name.includes('door_lf')) {
        doors.push(model)
      }
    })
    scene.add(gltf.scene)
  })
}
function setupTween(door) {
  tween = new TWEEN.Tween({ pos: 0 }).to({ pos: -1 }, 3000)
  tween.easing(TWEEN.Easing.Elastic.InOut)
  tween.onUpdate(() => {
    pos = this.pos

    leftdoor.rotation.set(0, pos, 0)
  })

  // tweenback = new TWEEN.Tween({ pos: -1 }).to({ pos: 0 }, 3000)
  // tweenback.easing(TWEEN.Easing.Elastic.InOut)
  // tweenback.onUpdate(function () {
  //   var pos = this.pos
  //   leftdoor.rotation.set(0, pos, 0)
  // })
}
let tween
function setTweens(obj, newObj, duration = 1500) {
  // let ro = new TWEEN.Tween(obj) //创建tween动画实例
  // ro.to(newObj, duration) //变化后的对象以及动画持续时间
  // ro.easing(TWEEN.Easing.Sinusoidal.InOut) //动画缓动函数
  // ro.onUpdate(() => {
  //   console.log('执行动画时间')
  // }) //执行回调
  // ro.start()

  tween = new TWEEN.Tween(obj, false)
    .to(newObj, 1000)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate(() => {
      console.log('执行动画时间')
    })
    .start()
  console.log('---', tween)
}

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
const render = () => {
  TWEEN.update()
  controls.update()
  renderer.render(scene, camera)
}

const handleClick = () => {
  const len = doors.length
  for (let i = 0; i < len; i++) {
    console.log('==', doors[i]['name'], doors[i]['rotation'])
    // doors[i]['rotation'].set(0,)
    setupTweenDoor({ z: 0 }, { z: Math.PI * -0.1 }, doors[i])
    // setTweens(
    //   item.rotation,
    //   {
    //     // x: item.rotation.x,
    //     x: item.rotation.x - 0.5 * Math.PI,

    //     y: item.rotation.y - 0.5 * Math.PI,
    //     z: item.rotation.z
    //   },
    //   1000
    // )
  }
}
const setupTweenDoor = (source, target, mesh) => {
  const carTween = new TWEEN.Tween(source)
    .to(target, 2000)
    .easing(TWEEN.Easing.Quadratic.Out)
  carTween.onUpdate(function (that) {
    mesh.rotation.z = that.z
  })
  carTween.start()
}
onMounted(() => {
  init()
  // function animate(time) {
  //   tween.update(time)
  //   requestAnimationFrame(animate)
  // }
  // requestAnimationFrame(animate)
})
</script>
<template>
  <div class="car-page">
    <div class="btn">
      <button @click="handleClick">打开车门</button>
    </div>
    <div id="container"></div>
  </div>
</template>
<style lang="scss">
.car-page {
  width: 100vw;
  height: 100svh;
}
</style>
