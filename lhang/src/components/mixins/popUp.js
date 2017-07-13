import PopupManager from './popupManager'
 
export default {
 props: {
 show: {
  type: Boolean,
  default: false
 },
 // 是否显示遮盖层
 overlay: {
  type: Boolean,
  default: true
 },
 overlayOpacity: {
  type: Number,
  default: 0.4
 },
 overlayColor: {
  type: String,
  default: '#000'
 }
 },
 // 组件被挂载时会判断show的值开控制打开
 attached () {
 if (this.show && this.overlay) {
  PopupManager.open(this)
 }
 },
 // 组件被移除时关闭
 detached () {
 PopupManager.close(this)
 },
 watch: {
 show (val) {
  // 修改 show 值是调用对于的打开关闭方法
  if (val && this.overlay) {
  PopupManager.open(this)
  } else {
  PopupManager.close(this)
  }
 }
 },
 beforeDestroy () {
 PopupManager.close(this)
 }
}