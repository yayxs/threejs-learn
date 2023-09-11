import { PerspectiveCamera } from 'three'
import { scene, sizes } from './renderer'
const VERTICAL_FIELD_OF_VIEW = 45 // degrees 45 is the normal

export const camera = new PerspectiveCamera(
  VERTICAL_FIELD_OF_VIEW, // default 50
  sizes.width / sizes.height,
  0.1, // 0.1
  2000 // 2000
)

camera.position.z = 5

// camera.lookAt(mesh.position)

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerWidth
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
})

scene.add(camera)

export default camera
