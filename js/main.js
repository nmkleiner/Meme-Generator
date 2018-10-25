'use strict'

var gScreenSizes = {};
var gCanvas
var gCtx
var gCurrImg = {}
var gCurrTxtLoc
var gFillOrStroke = 'fill';


function init() {
    gScreenSizes = getScreenSizes()
    createImgs()
    renderImgs();
    initCanvas()
}


function initCanvas() {
    gCanvas = document.querySelector('#canvas');
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



function onBackBtn() {
    toggleModal()
}


function onShadowChange(isChecked) {
    if (isChecked) addShadow(gCurrTxtLoc);
    else cancelShadow(gCurrTxtLoc)
    renderCanvas()
}

function onFillOrStrokeChange(fillOrStroke) {
    gFillOrStroke = (fillOrStroke === 'stroke') ? 'stroke' : 'fill';

}
function onColorChange(color) {
    (gFillOrStroke === 'stroke') ? changeStrokeColor(color, gCurrTxtLoc) : changeFillColor(color, gCurrTxtLoc);
    renderCanvas()
}



function onTxtChange(txtLoc, value) {
    gCurrTxtLoc = txtLoc;
    addText(gCurrTxtLoc, value);
    renderCanvas()
}

function onTxtFocus(txtLoc) {
    gCurrTxtLoc = txtLoc;
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


function onGalleryImgClick(elImg, imgId) {
    setMemeByImgId(imgId)
    toggleModal()
    gCurrImg = createImg(elImg.src)
    setCanvasSize(elImg)
    drawImage(gCurrImg)
}


function createImg(imgSrc) {
    var img = new Image()
    img.src = imgSrc
    return img
}

function onResize() {
    setCanvasSize()
    drawImage(gCurrImg)
}

function setCanvasSize() {
    var heightFactor = gCurrImg.height / gCurrImg.width

    if (window.innerWidth >= 992) {
        gCanvas.width = 500
    } else if (window.innerWidth >= 768) {
        gCanvas.width = window.innerWidth
    } else if (window.innerWidth >= 600) {
        gCanvas.width = 600
    } else {
        gCanvas.width = window.innerWidth
    }
    gCanvas.height = gCanvas.width * heightFactor
}

function drawImage(img) {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
}

function renderCanvas() {
    var meme = getMeme();

    // draw img
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    drawImage(gCurrImg)

    var height = gCanvas.height / 5; //if we add more lines we need a height factor
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
        gCtx.textAlign = currTxt.align

        // draws the text in the canvas
        gCtx.fillText(currTxt.line, gCanvas.width / 2, height)
        gCtx.strokeText(currTxt.line, gCanvas.width / 2, height)
        height += height * 3.4; //if we add more lines we need a height factor
    }
}



