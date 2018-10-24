'use strict'

var gScreenSizes = {};
var gCanvas
var gCtx
var currImg
var meme = {}


function init() {
    gScreenSizes = getScreenSizes()
    // gMeme will include gTeaxt and currImg both will be created in service
    //
    createImgs()
    renderImgs();
    initCanvas()
}


function initCanvas() {
    gCanvas = document.querySelector('#canvas');
    // gCanvas.width = window.innerWidth - 30//calc something real instead
    // gCanvas.height = window.innerHeight - 200
    gCtx = gCanvas.getContext('2d');
}


function renderImgs() {
    var imgs = getImgs();
    var elImgsContainer = document.querySelector('.imgs-container')
    var strHtmls = ''
    for (let i = 0; i < imgs.length; i++) {
        var currImgUrl = imgs[i].url;
        var currImgId = imgs[i].id;
        var strHtml = `<img  class = "gallery-img" src="${currImgUrl}" alt="Img Here" onclick = "onGalleryImgClick(this, ${currImgId})">`;
        strHtmls += strHtml;
    }
    elImgsContainer.innerHTML = strHtmls;
}

function onchangeFilter() {
    renderImgs()
}


function onGalleryImgClick(elImg, imgId) {
    setMemeByImgId(imgId)
    toggleModal()

    currImg = createImg(elImg.src)
    setCanvasSize(elImg)
    drawImage(currImg)
}

function onBackBtn() {
    toggleModal()
}

function toggleModal() {
    $('.modal').slideToggle(400)
    $('.modal').css('display', 'flex')
}


function toggleBtn(selector) {
    $(selector).fadeToggle(300)
    $(selector).css('display', 'inline-block')
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
        gCanvas.width = 500
        gCanvas.height = 500
    } else if (window.innerWidth > 700) {
        gCanvas.width = 500
        gCanvas.height = 500

    } else {
        gCanvas.width = window.innerWidth
        gCanvas.height = window.innerWidth
    }
}

function drawImage(img) {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
}

function onTxtChange(txtLoc ,value) {
    addText(txtLoc, value);
    drawText()
}

function drawText() {
    meme = getMeme();

    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    drawImage(currImg)
    setTextStyle(meme)

    // draws the text in the canvas
    gCtx.fillText(meme.txts[0].line, 100, 100)
    gCtx.strokeText(meme.txts[0].line, 100, 100)
    gCtx.fillText(meme.txts[1].line, 100, 300)
    gCtx.strokeText(meme.txts[1].line, 100, 300)
}

function setTextStyle(meme) {
    gCtx.font = `${meme.fontSize}px ${meme.fontFamily}`
    gCtx.fillStyle = meme.fillColor
    gCtx.strokeStyle = meme.strokeColor

    gCtx.shadowOffsetX = meme.shadowOffsetX
    gCtx.shadowOffsetY = meme.shadowOffsetY
    gCtx.shadowBlur = meme.shadowBlur
    gCtx.shadowColor = meme.shadowColor
}

function onShadowChange(isChecked) {
    if (isChecked) addShadow();
    else cancelShadow()
    drawText()
}

function onFillColorChange(color) {
    changeFillColor(color)
    drawText()
}

function onStrokeColorChange(color) {
    changeStrokeColor(color)
    drawText()
}

function onFontSizeChange(fontSize) {
    changeFontSize(fontSize)
    drawText()
}

function onFontSizeClick(num) {
    console.log(num)
    var fontSize = +($('.input-font-size').val())
    if (fontSize < 0) return;
    $('.input-font-size').val(fontSize + num)
    gText.fontSize = fontSize;
    drawText()
}

function onRangeColorChange(decStr, isFillColor) {
    var hexStr = getHex(decStr)
    if (isFillColor === 'fill') {
        var elRangeContainer = document.querySelector('#fill-range-container')
        meme.fillColor = hexStr
    } else {
        var elRangeContainer = document.querySelector('#stroke-range-container')
        meme.strokeColor = hexStr
    }
    elRangeContainer.style.backgroundColor = hexStr
    drawText()
}


function onDownload(elLink) {
    elLink.href = gCanvas.toDataURL()
    elLink.download = 'new-cool-meme.jpg'
}

