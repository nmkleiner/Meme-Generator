'use strict'

var gImgs;






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
        return  (currImg.keywords.some (keyWord => {
            return keyWord === currFilter
    }))
    })
}


   

function updateContext() {
    gCtx.shadowColor = gText.shadowColor
    gCtx.shadowOffsetX = gText.shadowOffsetX
    gCtx.shadowOffsetY = gText.shadowOffsetY
    gCtx.shadowBlur = gText.shadowBlur
    gCtx.font = `${gText.fontSize}px ${gText.fontFamily}`
    gCtx.fillStyle = gText.fillColor
    gCtx.strokeStyle = gText.strokeColor
}
