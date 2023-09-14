import {
  PerspectiveCamera,
  WebGLRenderer,
  Scene,
  Color,
  AxesHelper
} from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js' // three.js 的扩展库 专门用来加载gltf格式模型加载器
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js' // DRACOLoader 是一个附加组件，必须显式导入
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
class UseThree {
  constructor() {
    this.scene = void 0
    this.camera = void 0
    this.controls = void 0
    this.renderer = void 0
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.isLoadModel = false
    this.init()
  }

  async init() {
    this.setRenderer() // 渲染器 执行渲染操作
    this.setCamera() // 虚拟的相机
    this.cameraSetOrbitControls()
    this.setScene() // 虚拟的场景
    this.sceneAddModel()
  }

  /**
   * 创建场景
   */
  setScene() {
    this.scene = new Scene()
    this.scene.background = new Color(0xffffff) // 0x333333
  }
  /**
   * 3d项目使用透视投影相机
   * 车子以m为单位
   */
  setCamera() {
    // fov : 50, aspect : width / height, near : 0.1, far : 20000
    this.camera = new PerspectiveCamera(50, this.width / this.height, 0.1, 3000)
    // 设置相机的位置参数
    this.camera.position.set(5, 5, 5)
  }
  /**
   * 相机添加控件
   */
  cameraSetOrbitControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.addEventListener('change', (res) => {
      // 监听鼠标、键盘事件
      console.log('改变相机的参数', res)
      console.log('this.camera', this.camera.position)
    })
  }
  animationLoopCb() {
    this.renderer.render(this.scene, this.camera)
  }
  /**
   * 创建渲染器
   */
  setRenderer() {
    this.renderer = new WebGLRenderer()
    this.updateRenderer()
    this.renderer.setAnimationLoop(() => {
      this.animationLoopCb()
    })
    this.rendererInDom()
    // 添加响应式
    this.resizeRendererAndCamera()
  }

  rendererInDom() {
    // 添加到dom上
    const dom = document.getElementById('container')
    dom.appendChild(this.renderer.domElement)
  }
  /**
   * 更新渲染器
   */
  updateRenderer() {
    this.renderer.setSize(this.width, this.height) // 设置渲染区域的尺寸
    this.renderer.setClearColor(0xffffff, 1) // 设置背景颜色
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  resizeRendererAndCamera() {
    window.addEventListener('resize', () => {
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.camera.aspect = this.width / this.height
      this.camera.updateProjectionMatrix()
      this.updateRenderer()
    })
  }
  /**
   * 开始往场景中添加元素
   */
  async sceneAddModel() {
    const loadModelRes = await this.loading3DModel('/ferrari.glb')
    console.log(loadModelRes)
    if (loadModelRes.code === 0) {
      const model = loadModelRes?.gltf?.scene
      console.log(model)
      this.scene.add(model)
    }
  }
  /**
   * 往场景中添加 Axes Helper
   */
  sceneAddAxesHelper() {
    const axesHelper = new AxesHelper(8)
    scene.add(axesHelper)
  }
  /**
   * 用于压缩和解压缩3d网格点云的开源库，压缩后更小 需要额外的解码时间
   */
  draco() {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/jsm/libs/draco/')
    return dracoLoader
  }
  _setLoad(val) {
    this.isLoadModel = val
  }
  /**
   * 加载3D模型 glb就是gltf格式的二进制文件
   * 相机参数根据需要设置
   * 加载gltf的时候，webgl渲染器编码方式设置
   * @see https://threejs.org/docs/index.html#manual/zh/introduction/Loading-3D-models
   * @param {*} modelPath 模型的地址
   */
  loading3DModel(modelPath) {
    if (!modelPath) return

    return new Promise((resolve, reject) => {
      this._setLoad(true)
      // 实例化加载器对象
      const loader = new GLTFLoader()
      const dracoLoader = this.draco()
      loader.setDRACOLoader(dracoLoader)
      // 可以修改场景属性 gltf.scene 模型信息 几何体 材质 网格模型Mesh 动画信息
      loader.load(
        modelPath,
        (gltf) => {
          console.log('loading3DModel loader.load模型加载完毕')
          resolve({ code: 0, gltf }) // 返回模型对象
        },
        (params) => {
          console.log('loading3DModel loader.load模型加载中', params)
          const { loaded, total } = params
          const progress = Math.abs((loaded / total) * 100)
          if (progress >= 100) {
            setTimeout(() => {
              this._setLoad(false)
            }, 1000)
          }
        },
        (err) => {
          console.error('loading3DModel loader.load模型加载异常', err)
          const errInfo = {
            code: -1,
            err
          }
          resolve(errInfo)
        }
      )
    })
  }
}

async function init() {
  const three = new UseThree()
}

init()

export default UseThree
