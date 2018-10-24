'use strict'

var gScreenSizes = {};
var gCanvas
var gCtx
var currImg
var gText = {}

function init() {
    gScreenSizes = getScreenSizes()
    // gMeme will include gTeaxt and currImg both will be created in service
    // gMeme = createMeme()
    gText = {
        topText: '',
        botText: '',
        fontSize: 15,
        fillColor: '#FFFFFF',
        fontFamily: 'sans-serif',
        strokeColor: '#000000',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 0,
        shadowColor: 'rgba(0,0,0,0)',
    }
    createImgs()
    renderImgs();
    initCanvas()
}


function initCanvas() {
    gCanvas = document.querySelector('#canvas');
    // gCanvas.width = window.innerWidth - 30//calc something real instead
    // gCanvas.height = window.innerHeight - 200
    gCtx = canvas.getContext('2d');
}


function renderImgs() {
    var imgs = getImgs();
    var elImgsContainer = document.querySelector('.imgs-container')
    var strHtmls = ''
    for (let i = 0; i < imgs.length; i++) {
        var currImgUrl = imgs[i].url;
        var strHtml = `<img  class = "gallery-img" src="${currImgUrl}" alt="Img Here" onclick = "onGalleryImgClick(this)">`;
        strHtmls += strHtml;
    }
    elImgsContainer.innerHTML = strHtmls;
}


function onGalleryImgClick(elImg) {
    toggleBtn('.btn-download')
    toggleBtn('.btn-back')
    toggleModal()
    
    currImg = createImg(elImg.src)
    setCanvasSize(elImg)
    drawImage(currImg)
}

function onBackBtn() {
    toggleBtn('.btn-download')
    toggleBtn('.btn-back')
    toggleModal()
}

function toggleModal() {
    $('.modal').slideToggle(400)
    $('.modal').css('display', 'flex')
}


function toggleBtn(selector) {
    $(selector).fadeToggle(300)
    $(selector).css('display','inline-block')
}

function createImg(imgSrc) {
    var img = new Image()
    img.src = imgSrc
    return img
}

function setCanvasSize() {
    // innerHeight ~ innerWidth/2!!!
    // works fine for now, need to check it thoroughly
    if (window.innerWidth > 900) {
        gCanvas.width = 450
        gCanvas.height = 450
    } else if (window.innerWidth > 700) {
        gCanvas.width = 350
        gCanvas.height = 350
        
    } else {
        gCanvas.width = window.innerWidth
        gCanvas.height = window.innerWidth
    }
}

function drawImage(img) {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
}

function onTxtChange(elInput) {
    var id = elInput.id
    var text = elInput.value
    if (id === 'top-txt') {
        gText.topText = text
        drawText()
    } else {
        gText.botText = text
        drawText()
    }
}

function onShadowChange(isChecked) {
    if (isChecked) {
        gText.shadowColor = 'rgba(0,0,0,0.4)'
        gText.shadowBlur = 1
        gText.shadowOffsetX = 5
        gText.shadowOffsetY = 5
    } else {
        gText.shadowColor = 'rgba(0,0,0,0)'
        gText.shadowBlur = 0
        gText.shadowOffsetX = 0
        gText.shadowOffsetY = 0
    }
    drawText()
}

function drawText() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    drawImage(currImg)
    updateContext()
    
    
    gCtx.fillText(gText.topText, 100, 100)
    gCtx.strokeText(gText.topText, 100, 100)
    gCtx.fillText(gText.botText, 100, 300)
    gCtx.strokeText(gText.botText, 100, 300)
}


function onFillColorChange(color) {
    gText.fillColor = color
    drawText()
}


function onStrokeColorChange(color) {
    gText.strokeColor = color
    drawText() 
}

function onFontSizeChange(fontSize) {
    gText.fontSize = fontSize;
    drawText()
}

function onFontSizeBtnMinus() {
    var fontSize = +($('.input-font-size').val())
    if (fontSize < 0) return;
    $('.input-font-size').val(fontSize - 1)
    gText.fontSize = fontSize;
    drawText()
}

function onFontSizeBtnPlus() {
    var fontSize = +($('.input-font-size').val())
    $('.input-font-size').val(fontSize + 1)
    gText.fontSize = fontSize;
    drawText()
}
// if isYairConfirm()
// function onFontSizeClick(num) {
//     var fontSize = +($('.input-font-size').val())
//     if (fontSize < 0) return;
//     $('.input-font-size').val(fontSize + num)
//     gText.fontSize = fontSize;
//     drawText()
// }

// make this work on mousemove while mousedown:
// mouse down -> add event mousemove
// mouse up -> remove event mousemove
// mousemove -> onRangeColorChange
//  give range initial val 0
// make it change the model and drawText 

function onRangeColorChange(decStr,isFillColor) {
    var hexStr = getHex(decStr)
    if (isFillColor === 'fill') {
        var elRangeContainer = document.querySelector('#fill-range-container')
        gText.fillColor = hexStr
    } else {
        var elRangeContainer = document.querySelector('#stroke-range-container')
        gText.strokeColor = hexStr
    }
    elRangeContainer.style.backgroundColor = hexStr
    drawText()
}


function onDownload(elLink) {
    elLink.href = gCanvas.toDataURL()
    elLink.download = 'new-cool-meme.jpg'
}

