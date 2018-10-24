'use strict'

var gImgs;
var gMeme = {
    selectedImgId: undefined,
    txts: [
        {
            line: '',
            fontSize: 15,
            fontFamily: 'sans-serif',
            align: 'left',
            fillColor: '#FFFFFF',
            strokeColor: '#000000',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 0,
            shadowColor: 'rgba(0,0,0,0)',
        },
        {
            line: '',
            fontSize: 15,
            fontFamily: 'sans-serif',
            align: 'left',
            fillColor: '#FFFFFF',
            strokeColor: '#000000',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 0,
            shadowColor: 'rgba(0,0,0,0)',
        }
    ]
}






function createImgs() {

    var imgs = [
        { id: '001', url: 'img/001.jpg', keywords: ['Happy'] },
        { id: '002', url: 'img/002.jpg', keywords: ['Happy'] },
        { id: '003', url: 'img/003.jpg', keywords: ['Happy'] },
        { id: '004', url: 'img/004.jpg', keywords: ['Happy'] },
        { id: '005', url: 'img/005.jpg', keywords: ['Happy'] },
        { id: '006', url: 'img/006.jpg', keywords: ['Happy'] },
        { id: '007', url: 'img/007.jpg', keywords: ['Happy'] },
        { id: '008', url: 'img/008.jpg', keywords: ['Happy'] },
        { id: '009', url: 'img/009.jpg', keywords: ['Happy'] },
        { id: '010', url: 'img/010.jpg', keywords: ['Happy'] },
        { id: '011', url: 'img/011.jpg', keywords: ['Happy'] },
        { id: '012', url: 'img/012.jpg', keywords: ['Happy'] },
        { id: '013', url: 'img/013.jpg', keywords: ['Happy'] },
        { id: '014', url: 'img/014.jpg', keywords: ['Happy'] },
        { id: '015', url: 'img/015.jpg', keywords: ['Happy'] },
        { id: '016', url: 'img/016.jpg', keywords: ['Happy'] },
        { id: '017', url: 'img/017.jpg', keywords: ['Happy'] },
        { id: '018', url: 'img/018.jpg', keywords: ['Happy'] },
        { id: '019', url: 'img/019.jpg', keywords: ['Happy'] },
        { id: '020', url: 'img/020.jpg', keywords: ['Happy'] },
        { id: '021', url: 'img/021.jpg', keywords: ['Happy'] },
        { id: '022', url: 'img/022.jpg', keywords: ['Happy'] },
        { id: '023', url: 'img/023.jpg', keywords: ['Happy'] },
        { id: '024', url: 'img/024.jpg', keywords: ['Happy', 'Sad'] },
        { id: '025', url: 'img/025.jpg', keywords: ['Sad'] },
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
    currImg = gImgs.find(img => {
        return (+(img.id) === imgId);
    })
    gMeme.selectedImgId = currImg.id;
}

function getMeme(){
    return gMeme;
}

function addText(txtLoc ,value){
    gMeme.txts[txtLoc].line = value;
}

function updateMemeShadow(){
    gMeme.shadowOffsetX = 5
    gMeme.shadowOffsetY = 5
    gMeme.shadowBlur = 1
    gMeme.shadowColor = 'rgba(0,0,0,0.4)'
}

function addShadow(){
    gMeme.shadowOffsetX = 5
    gMeme.shadowOffsetY = 5
    gMeme.shadowBlur = 1
    gMeme.shadowColor = 'rgba(0,0,0,0.4)'
}

function cancelShadow(){
    gMeme.shadowOffsetX = 0
    gMeme.shadowOffsetY = 0
    gMeme.shadowBlur = 0
    gMeme.shadowColor = 'rgba(0,0,0,0)'
}

function changeFillColor(color){
    gMeme.fillColor = color;
}

function changeStrokeColor(color){
    gMeme.strokeColor = color;
}

function  changeFontSize(fontSize){
    gMeme.fontSize = fontSize;
}


