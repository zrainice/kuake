// 屏幕适配 -- 1rem = 750px中的100px
export default (function (doc, win) {
    var docEl = doc.documentElement
    var screenWidth = win.screen.width
    screenWidth = screenWidth > 750 ? 750 : screenWidth
    docEl.style.fontSize = 100 * (screenWidth / 750) + 'px'
})(document, window)
