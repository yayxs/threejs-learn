import * as THREE from 'three'
import {
  CSS2DRenderer,
  CSS2DObject
} from 'three/addons/renderers/CSS2DRenderer.js'
const sizes = {
  with: 800,
  height: 400
}
const dom = document.getElementById('app')
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x333333)
const camera = new THREE.PerspectiveCamera(
  30,
  sizes.with / sizes.height,
  1,
  3000
)

const div = document.getElementById('tag')
const tag = new CSS2DObject(div)
console.log(tag)
tag.position.set(50, 0, 50)
scene.add(tag)
const renderer = new THREE.WebGLRenderer()
const css2Renderer = new CSS2DRenderer()
renderer.setSize(sizes.with, sizes.height)

renderer.render(scene, camera)
css2Renderer.render(scene, camera)
css2Renderer.setSize(sizes.with, sizes.height)
dom.appendChild(renderer.domElement)
