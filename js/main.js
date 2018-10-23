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
    console.log(img)
    setCanvasSize(elImg)
    drawImage(img)
}

function openModal() {
    $('.modal').slideToggle(400)
}

function createImg(imgSrc) {
    var img = new Image()
    img.src = imgSrc
    return img
}

function setCanvasSize(img) {
    gCanvas.width = img.width*2
    gCanvas.height = img.height*2
}

function drawImage(img) {
    gCtx.drawImage(img, 0, 0 ,gCanvas.width, gCanvas.height)
}