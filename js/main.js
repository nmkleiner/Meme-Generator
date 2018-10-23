'use strict'

var gScreenSizes = {};
var gCanvas
var gCtx
var currImg
var gText = {}

function init() {
    gScreenSizes = getScreenSizes()
    gText = {
        topText: '',
        botText: '',
        fontSize: 15,
        fillColor: '#000000',
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
    toggleModal()
    
    currImg = createImg(elImg.src)
    setCanvasSize(elImg)
    drawImage(currImg)
}

function toggleModal() {
    toggleBtn('.btn-download')
    toggleBtn('.btn-back')

    $('.modal').slideToggle(400)
    $('.modal').css('display', 'flex')
}

function onBack() {
    toggleModal()
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
    // think about responsivity in here
    // right now works for mobile
    gCanvas.width = window.innerWidth
    gCanvas.height = window.innerWidth
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
    gCtx.fillText(gText.botText, 100, 600)
    gCtx.strokeText(gText.botText, 100, 600)
}


function onFillColorChange(color) {
    gText.fillColor = color
    drawText()
}


function onStrokeColorChange(color) {
    gText.strokeColor = color
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



function onDownload(elLink) {
    elLink.href = gCanvas.toDataURL()
    elLink.download = 'my-canvas.jpg'
}

