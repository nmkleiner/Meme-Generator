'use strict'

var gCanvas
var gCtx

function init (){
    renderImgs(gImgs);
    initCanvas()
}

function initCanvas() {
    gCanvas = document.querySelector('#canvas');
    gCanvas.width = window.innerWidth - 10//calc something real instead
    gCanvas.height = window.innerHeight - 10
    gCtx = canvas.getContext('2d');
}

function renderImgs(gImgs) {
    var elImgsContainer = document.querySelector('.imgs-container')
    var strHtmls = ''
    for (let i = 0; i < gImgs.length; i++) {
        var strHtml =
            ` <img src="${getImgUrl()}" alt="Img Here" onclick = "openModal(this)">`
        strHtmls += strHtml;
    }
    elImgsContainer.innerHtml = strHtmls;
}

function getImgUrl(){
    
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