import Vue from 'vue'
import overlayOpt from '../overlay' // 引入 overlay 组件
const Overlay = Vue.extend(overlayOpt)
 
const getDOM = function (dom) {
 if (dom.nodeType === 3) {
 dom = dom.nextElementSibling || dom.nextSibling
 getDOM(dom)
 }
 return dom
}
 
// z-index 控制
var zIndex = 20141223 
 
const getZIndex = function () {
 return zIndex++ 
}
// 管理
const PopupManager = {
 instances: [], // 用来储存所有的弹出层实例
 overlay: false,
 // 弹窗框打开时 调用此方法
 open (instance) {
 if (!instance || this.instances.indexOf(instance) !== -1) return
  
 // 当没有遮盖层时，显示遮盖层
 if (this.instances.length === 0) {
  this.showOverlay(instance.overlayColor, instance.overlayOpacity)
 }
 this.instances.push(instance) // 储存打开的弹出框组件
 this.changeOverlayStyle() // 控制不同弹出层 透明度和颜色
  
 // 给弹出层加上z-index
 const dom = getDOM(instance.$el)
 dom.style.zIndex = getZIndex()
 },
 // 弹出框关闭方法
 close (instance) {
 let index = this.instances.indexOf(instance)
 if (index === -1) return
  
 Vue.nextTick(() => {
  this.instances.splice(index, 1)
   
  // 当页面上没有弹出层了就关闭遮盖层
  if (this.instances.length === 0) {
  this.closeOverlay()
  }
  this.changeOverlayStyle()
 })
 },
 showOverlay (color, opacity) {
 let overlay = this.overlay = new Overlay({
  el: document.createElement('div')
 })
 const dom = getDOM(overlay.$el)
 dom.style.zIndex = getZIndex()
 overlay.color = color
 overlay.opacity = opacity
 overlay.onClick = this.handlerOverlayClick.bind(this)
 overlay.$appendTo(document.body)
 
 // 禁止页面滚动
 this.bodyOverflow = document.body.style.overflow
 document.body.style.overflow = 'hidden'
 },
 closeOverlay () {
 if (!this.overlay) return
 document.body.style.overflow = this.bodyOverflow
 let overlay = this.overlay
 this.overlay = null
 overlay.$remove(() => {
  overlay.$destroy()
 })
 },
 changeOverlayStyle () {
 if (!this.overlay || this.instances.length === 0) return
 const instance = this.instances[this.instances.length - 1]
 this.overlay.color = instance.overlayColor
 this.overlay.opacity = instance.overlayOpacity
 },
 // 遮盖层点击处理，会自动调用 弹出层的 overlayClick 方法
 handlerOverlayClick () {
 if (this.instances.length === 0) return
 const instance = this.instances[this.instances.length - 1]
 if (instance.overlayClick) {
  instance.overlayClick()
 }
 }
}
 
window.addEventListener('keydown', function (event) {
 if (event.keyCode === 27) { // ESC
 if (PopupManager.instances.length > 0) {
  const topInstance = PopupManager.instances[PopupManager.instances.length - 1]
  if (!topInstance) return
  if (topInstance.escPress) {
  topInstance.escPress()
  }
 }
 }
})
 
export default PopupManager