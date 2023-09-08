import * as TWEEN from '@tweenjs/tween.js'

const box = document.getElementById('box') // 获取设置动画的元素

const coords = { x: 0, y: 0 } // 从 0 0 开始

const tween = new TWEEN.Tween(coords, false)
  .to({ x: 300, y: 200 }, 1000)
  .easing(TWEEN.Easing.Quadratic.InOut)
  .onUpdate(() => {
    // 更新坐标后调用执行
    box.style.setProperty('transform', `translate(${coords.x}px,${coords.y}px)`)
  })
  .start() // 创建一个修改坐标 1s 内移动到 300 200  使用缓动动画

// 设置动画循环

function animate(time) {
  tween.update(time)
  requestAnimationFrame(animate)
}
requestAnimationFrame(animate)
