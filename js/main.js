'use strict'

var gScreenSizes = {};
var gCanvas
var gCtx

function init() {
    gScreenSizes = getScreenSizes()
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
    openModal()
    var img = createImg(elImg.src)
    setCanvasSize(elImg)
    drawImage(img)
}

function openModal() {
    $('.modal').slideToggle(400)
    $('.modal').css('display','flex')

}

function createImg(imgSrc) {
    var img = new Image()
    img.src = imgSrc
    return img
}

function setCanvasSize(img) {
    // think about responsivity in here

    // mobile
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
        drawText(text,'top')
    } else {
        drawText(text,'bot')
        
    }
}


function drawText() {   
    gCtx.moveTo(100,100)
    gCtx.fillText()
    
}


function onFontSizeBtnMinus() {
    var currVal = +($('.input-rate').val())
     $('.input-rate').val(currVal - 1)
     gText.fontSize = currVal;
     drawText ()
}

function onFontSizeBtnPlus() {
    var currVal = +($('.input-font-size').val())
    $('.input-font-size').val(currVal + 1)
    gText.fontSize = currVal;
    drawText ()
}