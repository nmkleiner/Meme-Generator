'use strict'

var gScreenSizes = {}

function init (){
    gScreenSizes = getScreenSizes()
    renderImgs(gImgs);
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
    
}
