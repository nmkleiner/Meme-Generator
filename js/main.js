'use strict'

function init() {
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




