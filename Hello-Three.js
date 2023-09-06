import * as THREE from 'three'
// 创建渲染器
const dom = document.getElementById('app')
/**
 *  入参是对象 see https://threejs.org/docs/index.html#api/zh/renderers/WebGLRenderer
 */
const renderer = new THREE.WebGLRenderer({ canvas: dom })

/**
 * 创建镜头 透视投影
 * 默认50 fov
 * 宽高比 aspect
 * 最近的距离 near 0.1
 * 最远的距离 far 2000
 */
const camera = new THREE.PerspectiveCamera()

/**
 * 创建场景
 */
const scene = new THREE.Scene()

/**
 * 创建几何体
 */
const geometry = new THREE.BoxGeometry(1, 1, 1) // 立方缓冲几何体
/**
 * 创建材质
 * // 让立方体反射光
 */

const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 })
