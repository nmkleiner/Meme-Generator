'use strict'

var gScreenSizes = {}

function init (){
    // renderImgs(gImgs);
    gScreenSizes = getScreenSizes()
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
