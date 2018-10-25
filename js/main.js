'use strict'

var gScreenSizes = {};
var gCanvas
var gOffset = {}
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
    updateX(0)


    renderCanvas()
}



function onTxtFocus(txtLoc) {
    gCurrTxtLoc = txtLoc;
    // drawFrame(gCurrTxtLoc)
}


function onFontSizeClick(fontSizeNum) {
    changeFontSize(fontSizeNum, gCurrTxtLoc)
    updateX(0)
    updateY(0)
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
    setCanvas(elImg)
    drawImage(gCurrImg)
}


function createImg(imgSrc) {
    var img = new Image()
    img.src = imgSrc
    return img
}

function onResize() {
    setCanvas()
    drawImage(gCurrImg)
}

function setCanvas() {
    var heightFactor = gCurrImg.height / gCurrImg.width

    if (window.innerWidth > 768) {
        gCanvas.width = 500
    } else {
        gCanvas.width = window.innerWidth
        $('.caption').css('width', '100vw')

        if (window.innerHeight < window.innerWidth) {
            gCanvas.width = 500
            $('.caption').css('width', '500px')
        }
    }
    gCanvas.height = gCanvas.width * heightFactor

    gOffset = getOffset()
    initLine()
}

function drawImage(img) {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
}

function renderCanvas() {
    var meme = getMeme();

    // draw img
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    drawImage(gCurrImg)

    // var height = gCanvas.height / 5; //if we add more lines we need a height factor
    var currTxt
    var lineX
    var lineY
    for (let i = 0; i < meme.txts.length; i++) {
        // set Text Style
        currTxt = meme.txts[i]
        if (currTxt.isSelected) {
            drawFrame(i)
        }
        lineX = currTxt.lineX;
        lineY = currTxt.lineY;
        gCtx.font = `${currTxt.fontSize}px ${currTxt.fontFamily}`
        gCtx.fillStyle = currTxt.fillColor
        gCtx.strokeStyle = currTxt.strokeColor
        gCtx.shadowOffsetX = currTxt.shadowOffsetX
        gCtx.shadowOffsetY = currTxt.shadowOffsetY
        gCtx.shadowBlur = currTxt.shadowBlur
        gCtx.shadowColor = currTxt.shadowColor
        gCtx.textAlign = currTxt.align

        // draws the text in the canvas
        gCtx.fillText(currTxt.line, lineX, lineY)
        gCtx.strokeText(currTxt.line, lineX, lineY)
    }
}



function onCanvasClick(ev) {
    var x = ev.clientX - gOffset.left;
    var y = ev.clientY - gOffset.top;
    var texts = gMeme.txts
    console.log('x,y',x,y)
    var lineIdx = gMeme.txts.findIndex(txt => {
        return (y > txt.lineYRange[0] - 5 &&
            y < txt.lineYRange[1] + 5 &&
            x > txt.lineXRange[0] - 5 &&
            x < txt.lineXRange[1] + 5)
    })
    texts.forEach(txt => {
        txt.isSelected = false;
    })
    if (lineIdx !== -1) {
        gCurrTxtLoc = lineIdx
        gMeme.txts[gCurrTxtLoc].isSelected = true;
        renderCanvas()
    }
}


function onXChange(xDiff) {
    updateX(xDiff, gCurrTxtLoc)
    renderCanvas()
}

function onYChange(yDiff) {
    updateY(yDiff, gCurrTxtLoc)
    renderCanvas()
}


function drawFrame(line) {
    var txt = gMeme.txts[line]
    gCtx.beginPath()
    gCtx.save()
    gCtx.strokeStyle = 'orangered'
    gCtx.rect(txt.lineXRange[0] - 10, txt.lineYRange[0],
        txt.lineXRange[1] - txt.lineXRange[0] + 20, txt.lineYRange[1] - txt.lineYRange[0] + 10);
    gCtx.stroke();
    gCtx.restore();
}
