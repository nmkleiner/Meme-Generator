'use strict'

var gScreenSizes = {};
var gCanvas
var gCtx
var gCurrImg
var gCurrTxtLoc
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
    gCurrImg = createImg(elImg.src)
    setCanvasSize(elImg)
    drawImage(gCurrImg)
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
    if (window.innerWidth > 1000) {
        gCanvas.width = 500
        gCanvas.height = 500
    } else if (window.innerWidth >= 768) {
        gCanvas.width = 600
        gCanvas.height = 600

    } else {
        gCanvas.width = window.innerWidth
        gCanvas.height = window.innerWidth
    }
}

function drawImage(img) {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
}

function onTxtChange(txtLoc, value) {
    gCurrTxtLoc = txtLoc;
    addText(gCurrTxtLoc, value);
    renderCanvas()
}

function onTxtFocus(txtLoc) {
    gCurrTxtLoc = txtLoc;
}

function renderCanvas() {
    meme = getMeme();

    // draw img
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    drawImage(gCurrImg)

    var height = 100;
    for (let i = 0; i < meme.txts.length; i++) {

        // set Text Style
        var currTxt = meme.txts[i]
        gCtx.font = `${currTxt.fontSize}px ${currTxt.fontFamily}`
        gCtx.fillStyle = currTxt.fillColor
        gCtx.strokeStyle = currTxt.strokeColor
        gCtx.shadowOffsetX = currTxt.shadowOffsetX
        gCtx.shadowOffsetY = currTxt.shadowOffsetY
        gCtx.shadowBlur = currTxt.shadowBlur
        gCtx.shadowColor = currTxt.shadowColor


        // draws the text in the canvas
        gCtx.fillText(currTxt.line, 100, height)
        gCtx.strokeText(currTxt.line, 100, height)
        height += 200;
    }
}

function onShadowChange(isChecked) {
    if (isChecked) addShadow(gCurrTxtLoc);
    else cancelShadow(gCurrTxtLoc)
    renderCanvas()
}

function onFillColorChange(color) {
    changeFillColor(color, gCurrTxtLoc)
    renderCanvas()
}

function onStrokeColorChange(color) {
    changeStrokeColor(color, gCurrTxtLoc)
    renderCanvas()
}

function onFontSizeChange(fontSize) {
    changeFontSize(fontSize, gCurrTxtLoc)
    renderCanvas()
}

function onFontSizeClick(num) {
    var fontSize = +($('.input-font-size').val())
    if (fontSize < 0) return;
    fontSize = fontSize + num
    $('.input-font-size').val(fontSize)
    changeFontSize(fontSize, gCurrTxtLoc)
    renderCanvas()
}

function onRangeColorChange(decStr, isFillColor) {
    var color = getHex(decStr)
    if (isFillColor === 'fill') {
        var elRangeContainer = document.querySelector('#fill-range-container')
        changeFillColor(color, gCurrTxtLoc)
    } else {
        var elRangeContainer = document.querySelector('#stroke-range-container')
        changeStrokeColor(color, gCurrTxtLoc)
    }
    elRangeContainer.style.backgroundColor = color
    renderCanvas()
}


function onDownload(elLink) {
    elLink.href = gCanvas.toDataURL()
    elLink.download = 'new-cool-meme.jpg'
}

