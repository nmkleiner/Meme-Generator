'use strict'

var gImgs;



function getScreenSizes() {
    var width = window.innerWidth
    var height = window.innerHeight
    return { width, height }
}

function createImgs() {
    var imgs = [
        { id: '001', url: 'img/001.jpg', keywords: ['happy'] },
        { id: '002', url: 'img/002.jpg', keywords: ['happy'] },
        { id: '003', url: 'img/003.jpg', keywords: ['happy'] },
        { id: '004', url: 'img/004.jpg', keywords: ['happy'] },
        { id: '005', url: 'img/005.jpg', keywords: ['happy'] },
        { id: '006', url: 'img/006.jpg', keywords: ['happy'] },
        { id: '007', url: 'img/007.jpg', keywords: ['happy'] },
        { id: '008', url: 'img/008.jpg', keywords: ['happy'] },
        { id: '009', url: 'img/009.jpg', keywords: ['happy'] },
        { id: '010', url: 'img/010.jpg', keywords: ['happy'] },
        { id: '011', url: 'img/011.jpg', keywords: ['happy'] },
        { id: '012', url: 'img/012.jpg', keywords: ['happy'] },
        { id: '013', url: 'img/013.jpg', keywords: ['happy'] },
        { id: '014', url: 'img/014.jpg', keywords: ['happy'] },
        { id: '015', url: 'img/015.jpg', keywords: ['happy'] },
        { id: '016', url: 'img/016.jpg', keywords: ['happy'] },
        { id: '017', url: 'img/017.jpg', keywords: ['happy'] },
        { id: '018', url: 'img/018.jpg', keywords: ['happy'] },
        { id: '019', url: 'img/019.jpg', keywords: ['happy'] },
        { id: '020', url: 'img/020.jpg', keywords: ['happy'] },
        { id: '021', url: 'img/021.jpg', keywords: ['happy'] },
        { id: '022', url: 'img/022.jpg', keywords: ['happy'] },
        { id: '023', url: 'img/023.jpg', keywords: ['happy'] },
        { id: '024', url: 'img/024.jpg', keywords: ['happy'] },
        { id: '025', url: 'img/025.jpg', keywords: ['happy'] },
    ]
    gImgs = imgs;
}

function getImgs() {
    return gImgs;
}
