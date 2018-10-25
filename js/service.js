'use strict'

var gImgs;
var gMeme = {
    selectedImgId: undefined,
    txts: [
        {
            line: '',
            fontSize: 45,
            lineY: 0,
            lineYRange: [],
            lineX: 0,
            lineXRange: [],
            fontFamily: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif',
            align: 'center',
            fillColor: '#FFFFFF',
            strokeColor: '#000000',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 0,
            shadowColor: 'rgba(0,0,0,0)',
            isSelected: false
        },
        {
            line: '',
            fontSize: 45,
            lineY: 0,
            lineYRange: [],
            lineX: 0,
            lineXRange: [],
            fontFamily: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif',
            align: 'center',
            fillColor: '#FFFFFF',
            strokeColor: '#000000',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 0,
            shadowColor: 'rgba(0,0,0,0)',
            isSelected: false
        }
    ]
}


function createImgs() {

    var imgs = [
        { id: '001', url: 'img/001.jpg', keywords: ['All', 'Happy'] },
        { id: '002', url: 'img/002.jpg', keywords: ['All', 'Happy'] },
        { id: '003', url: 'img/003.jpg', keywords: ['All', 'Happy'] },
        { id: '004', url: 'img/004.jpg', keywords: ['All', 'Happy'] },
        { id: '005', url: 'img/005.jpg', keywords: ['All', 'Happy'] },
        { id: '006', url: 'img/006.jpg', keywords: ['All', 'Happy'] },
        { id: '007', url: 'img/007.jpg', keywords: ['All', 'Happy'] },
        { id: '008', url: 'img/008.jpg', keywords: ['All', 'Happy'] },
        { id: '009', url: 'img/009.jpg', keywords: ['All', 'Happy'] },
        { id: '010', url: 'img/010.jpg', keywords: ['All', 'Happy'] },
        { id: '011', url: 'img/011.jpg', keywords: ['All', 'Happy'] },
        { id: '012', url: 'img/012.jpg', keywords: ['All', 'Happy'] },
        { id: '013', url: 'img/013.jpg', keywords: ['All', 'Happy'] },
        { id: '014', url: 'img/014.jpg', keywords: ['All', 'Happy'] },
        { id: '015', url: 'img/015.jpg', keywords: ['All', 'Happy'] },
        { id: '016', url: 'img/016.jpg', keywords: ['All', 'Happy'] },
        { id: '017', url: 'img/017.jpg', keywords: ['All', 'Happy'] },
        { id: '018', url: 'img/018.jpg', keywords: ['All', 'Happy'] },
        { id: '019', url: 'img/019.jpg', keywords: ['All', 'Happy'] },
        { id: '020', url: 'img/020.jpg', keywords: ['All', 'Happy'] },
        { id: '021', url: 'img/021.jpg', keywords: ['All', 'Happy'] },
        { id: '022', url: 'img/022.jpg', keywords: ['All', 'Happy'] },
        { id: '023', url: 'img/023.jpg', keywords: ['All', 'Happy'] },
        { id: '024', url: 'img/024.jpg', keywords: ['All', 'Happy', 'Sad'] },
        { id: '025', url: 'img/025.jpg', keywords: ['All', 'Sad'] },
    ]
    gImgs = imgs;
}

function getImgs() {
    var currFilter = ($('.filter').val())
    if (currFilter === '') return gImgs;
    else return gImgs.filter(currImg => {
        return (currImg.keywords.some(keyWord => {
            return keyWord === currFilter
        }))
    })
}

function setMemeByImgId(imgId) {
    gCurrImg = gImgs.find(img => {
        return (+(img.id) === imgId);
    })
    gMeme.selectedImgId = gCurrImg.id;
}

function getMeme() {
    return gMeme;
}

function addText(txtLoc, value) {
    gMeme.txts[txtLoc].line = value;
}


function addShadow(currTxtLoc) {
    var currTxt = gMeme.txts[currTxtLoc];
    currTxt.shadowOffsetX = 5
    currTxt.shadowOffsetY = 5
    currTxt.shadowBlur = 1
    currTxt.shadowColor = 'rgba(0,0,0,0.4)'
}

function cancelShadow(currTxtLoc) {
    var currTxt = gMeme.txts[currTxtLoc];
    currTxt.shadowOffsetX = 5
    currTxt.shadowOffsetY = 5
    currTxt.shadowBlur = 1
    currTxt.shadowColor = 'rgba(0,0,0,0)'
}

function changeFillColor(color, currTxtLoc) {
    var currTxt = gMeme.txts[currTxtLoc];
    currTxt.fillColor = color;
}

function changeStrokeColor(color, currTxtLoc) {
    var currTxt = gMeme.txts[currTxtLoc];
    currTxt.strokeColor = color;
}

function changeFontSize(fontSize, currTxtLoc) {
    var currTxt = gMeme.txts[currTxtLoc];
    currTxt.fontSize = fontSize;
}



function getOffset() {
    var left = gCanvas.offsetLeft;
    var top = gCanvas.offsetTop;
    return { left, top }
}


function initLine() {
    if (!gMeme.txts[0].lineX) {
        for (var i = 0; i < gMeme.txts.length; i++) {
            var txt = gMeme.txts[i]

            // init line x
            txt.lineX = gCanvas.width / 2
            txt.lineXRange = [
                txt.lineX - (txt.line.length * txt.fontSize * 0.6) / 2,
                txt.lineX + (txt.line.length * txt.fontSize * 0.6) / 2
            ]

            // init line Y
            var factor = 1
            if (i === 1) var factor = 4
            txt.lineY = gCanvas.height * factor / 5
            txt.lineYRange = [
                txt.lineY,
                txt.lineY - txt.fontSize
            ]

        }
    }
}

function updateX(xDiff) {
    console.log('xDiff called')
    var txt = gMeme.txts[gCurrTxtLoc]
    if (xDiff) txt.lineX += xDiff

    txt.lineXRange = [
        txt.lineX - (txt.line.length * txt.fontSize * 0.5) / 2,
        txt.lineX + (txt.line.length * txt.fontSize * 0.5) / 2
    ]
    console.log(txt.lineXRange)
}

function updateY(yDiff) {
    var txt = gMeme.txts[gCurrTxtLoc]
    if (yDiff) txt.lineY += yDiff 
    txt.lineYRange = [
        txt.lineY,
        txt.lineY - txt.fontSize
    ]
    console.log(txt.lineYRange)
}