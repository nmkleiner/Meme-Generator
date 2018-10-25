'use strict'

function getScreenSizes() {
    var width = window.innerWidth
    var height = window.innerHeight
    return { width, height }
}


function getHex(decStr) {
    var hexStr = parseInt(decStr).toString(16)
    if (hexStr.length < 6) {
        var fixLen = 6 - hexStr.length
        var fixStr = ''
        for (var i = 0; i < fixLen; i++) {
            fixStr += '0'
        }
        hexStr = fixStr + hexStr
    }
    hexStr = '#' + hexStr
    return hexStr
}


function toggleModal() {
    $('.modal').slideToggle(400)
    $('.modal').css('display', 'flex')
}

function resetValue(el) {
    el.value = ''
}