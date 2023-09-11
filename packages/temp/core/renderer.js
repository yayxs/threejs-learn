import { Scene, Color, AxesHelper, WebGLRenderer } from 'three'
export const sizes = {
  width: window.innerWidth,
  height: window.innerWidth
}

// 场景
export const scene = new Scene()
scene.background = new Color('#333')

const canvas = document.querySelector('#webgl')
export const renderer = new WebGLRenderer({
  canvas,
  antialias: true
})

// Axes Helper
const axesHelper = new AxesHelper()
scene.add(axesHelper)

function updateRenderer() {
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // To avoid performance problems on devices with higher pixel ratio
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerWidth
  updateRenderer()
})
updateRenderer()

export default {
  renderer
}
