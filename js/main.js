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
    gCanvas.width = window.innerWidth - 30//calc something real instead
    gCanvas.height = window.innerHeight - 200
    gCtx = canvas.getContext('2d');
}


function renderImgs() {
    var imgs = getImgs();
    var elImgsContainer = document.querySelector('.imgs-container')
    var strHtmls = ''
    for (let i = 0; i < imgs.length; i++) {
        var currImgUrl = imgs[i].url;
        var strHtml = `<img  class = "gallery-img" src="${currImgUrl}" alt="Img Here" onclick = "openModal(this)">`;
        strHtmls += strHtml;
    }
    elImgsContainer.innerHTML = strHtmls;
}


function onGalleryImgClick(elImg) {
    openModal()
    renderCanvas(elImg)
}



function openModal() {

    $('.modal').slideToggle(400)
}

function renderCanvas(elImg) {
    var imgSrc = getImageSrc(elImg)
    console.log('imgSrc')
    drawImage(imgSrc)
}

function getImageSrc(elImg) {
    return elImg.getAttribute('src')
}

function drawImage(imgSrc) {
    var img = new Image()
    img.src = imgSrc
    img.onload = function() {
        gCtx.drawImage(img, 0, 0 ,gCanvas.width, gCanvas.height)
    }
}