'use strict'

var gScreenSizes = {};

function init() {
    gScreenSizes = getScreenSizes()
    createImgs()
    renderImgs();
}



function renderImgs() {
    var imgs = getImgs();
    var elImgsContainer = document.querySelector('.imgs-container')
    var strHtmls = ''
    for (let i = 0; i < imgs.length; i++) {
        var currImgUrl = imgs[i].url;
        var strHtml = `<img  class = "gallery-img" src="${currImgUrl}" alt="Img Here" onclick = "openModal(this)">`;
        strHtmls += strHtml;
    }
    elImgsContainer.innerHTML = strHtmls;
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
