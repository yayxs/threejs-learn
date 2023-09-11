import * as THREE from 'three'
// import { Vector3 } from 'three'
import { renderer, scene } from './core/renderer'
import camera from './core/camera'

//实例化一个三维向量对象
const v3 = new THREE.Vector3(0, 0, 0)
console.log('v3', v3)
v3.set(10, 0, 0) // set方法设置向量的值

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
console.log('material.color', material.color)
const mesh1 = new THREE.Mesh(geometry, material)

mesh1.position.y = 2

const group = new THREE.Group()

const mesh2 = new THREE.Mesh(geometry, material)

group.add(mesh1)
group.add(mesh2)
scene.add(group)
console.log('查看group的子对象', group.children)

const loop = () => {
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}

loop()
