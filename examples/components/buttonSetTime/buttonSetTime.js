/**
 * 倒计时功能
 */

function ButtonSetTime (ele) {
  this.element = document.getElementById(ele)
}

/**
 *
 * @param {初始化obj} obj
 */
ButtonSetTime.prototype.init = function (obj) {
  this.index = obj.index
  this.start = obj.start || '获取验证码'
  this.during = obj.during || '秒后重新获取..'
  this.end = obj.end || this.start
  this.element.innerHTML = this.start
  this.edge = obj.index
  var that = this
  this.element.onclick = function () {
    that.element.setAttribute('disabled', true)
    that.element.innerHTML = that.index + that.during
    var timeId = setInterval(function () {
      that.index--
      if (that.index === 0) {
        clearInterval(timeId)
        that.element.innerHTML = that.end
        that.element.removeAttribute('disabled')
        that.index = obj.index
      } else {
        that.element.innerHTML = that.index + that.during
      }
    }, 1000)
    if (obj.fn) {
      that.fn(obj.fn)
    }
  }
}

/**
 *
 * @param {回调函数} fn
 */
ButtonSetTime.prototype.fn = function (fn) {
  fn()
}
var buttonSetTime = function (ele) {
  return new ButtonSetTime(ele)
}

export default buttonSetTime
