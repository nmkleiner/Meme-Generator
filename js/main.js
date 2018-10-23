'use strict'

var gScreenSizes = {};
var gCanvas
var gCtx
var currImg
var gText ={}

function init() {
    gScreenSizes = getScreenSizes()
    gText = {
        fontSize: 10,
        fillColor: '#000000',
        fontFamily: 'sans-serif',
         strokeColor:'#000000'
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
    openModal()
    currImg = createImg(elImg.src)
    setCanvasSize(elImg)
    drawImage(currImg)
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
        drawText(text,100,100)
    } else {
        drawText(text,100,300)
    }
}


function drawText(text,x,y) { 
    gCtx.clearRect(0,0,gCanvas.width,gCanvas.height)
    drawImage(currImg)
    gCtx.fillText(text,x,y)
}


function onColorChange(color) {
    $btn = $('#choose-color')
    $btn.css()
    gCtx.fillStyle = color
}