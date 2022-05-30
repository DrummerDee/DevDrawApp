
const canvas = document.getElementById('drawing-board');
const ctx = canvas.getContext('2d');
const toolbar = document.getElementById('toolbar');
const save = document.getElementById('save-to-local-storage');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

var url = canvas.toDataURL();
localStorage.setItem('url', url);
var toDrawUrl = localStorage.getItem('url');
drawDataURIOnCanvas(toDrawUrl, ctx);
ctx.fillStyle = "rgb(200,200,0)";
ctx.fillRect (20, 20, 55, 50);


function drawDataURIOnCanvas(strDataURI, context) {
    "use strict";
    var img = new window.Image();
    img.addEventListener("load", function () {
        context.drawImage(img, 0, 0);
    });
    img.setAttribute("src", strDataURI);
}

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 5;
let startX;
let startY;

toolbar.addEventListener('click', e => {
    if(e.target.id === 'clear'){
        ctx.clearRect(0,0,canvas.width,canvas.height);
    }
});

toolbar.addEventListener('change', e => {
    if(e.target.id == 'stroke'){
        ctx.strokeStyle = e.target.value;
    }
    if(e.target.id == 'lineWidth'){
        lineWidth = e.target.value;
    }
});

const draw = (e) => {
    if(!isPainting){
        return 
    }
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
    ctx.stroke();
}

canvas.addEventListener('mousedown',(e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('mouseup', (e) =>{
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('mousemove',draw);
