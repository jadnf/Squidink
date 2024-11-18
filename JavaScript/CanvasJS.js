var ctx, flag = false,
    prevMouseX = 0,
    prevMouseY = 0,
var ctx, flag = false,
    prevMouseX = 0,
    prevMouseY = 0,
    canvasWidth = 400,
    canvasHeight = 400,
    currentCanvas = 1,
    dot_flag = false;
    isDrawing = false;

let canvas = document.getElementById('can');
const inputcolor = document.getElementById('custom');

var colorValue,tool="pen";

var paintStrokes = [];
var layers = [];

var canvasOffset=$("#can").offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;


var x = "black",
    y = 2;

function init() {
    HotKeys();

    w = canvas.width;
    h = canvas.height;

    
    inputcolor.addEventListener('input', (event) => {

        colorValue = event.target.value;
        x = colorValue;
        strokeSize();
    }), false;


    
    inputcolor.addEventListener('input', (event) => {

        colorValue = event.target.value;
        x = colorValue;
        strokeSize();
    }), false;

    layers.push(canvas);


    currentCanvas = 1;
    changeCurrentCanvasContext()


    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
    changeCurrentCanvasContext()


    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
}
function addLayer() {
    newCanvas = document.createElement('canvas');
    newCanvas.width = canvasWidth;
    newCanvas.height = canvasHeight;
    newCanvas.id = 'can' + (layers.length - 1);
    newCanvas.style = 'position:absolute;top:10%;left:10%;border:2px solid;';
    layers.push(newcanvas);
}
function changeCurrentLayer(direction) {
    if (direction = 'up') {
        currentCanvas++;
    } else if (direction = 'down') {
        currentCanvas--;
    }
    changeCurrentCanvasContext();
}
function changeCurrentCanvasContext() {
    ctx = layers[currentCanvas - 1].getContext('2d');
}



function color(obj) {
    
    
    if (obj.id == "white") {
        //x = "white";
        tool = "eraser";
    }
    if (obj.id == "colorDisplay") {
        x = colorValue
        strokeSize();
        tool = "pen";
        tool = "pen";
    }

  

}

function erase() {

    ctx.clearRect(0, 0, w, h);
    document.getElementById("canvasimg").style.display = "none";

}

function save() {
    document.getElementById("canvasimg").style.border = "2px solid";
    var dataURL = canvas.toDataURL();
    document.getElementById("canvasimg").src = dataURL;
    document.getElementById("canvasimg").style.display = "inline";
}

function findxy(res, e) {
    if (res == 'down') {
        isDrawing = true;
        if (isDrawing) {
            ctx.beginPath();
            ctx.lineWidth = y;
            ctx.strokeStyle = x;
            ctx.fillStyle = x;

            snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
        }
    }
    if (res == 'up') {
        isDrawing = false;
    }
    if (res == 'move') {
        if (isDrawing) {
            if(tool == "pen")
            {
                ctx.globalCompositeOperation="source-over";  
                ctx.putImageData(snapshot, 0, 0);
                ctx.arc(prevMouseX,prevMouseY,y,0,Math.PI*2,false);
                ctx.moveTo(e.offsetX, e.offsetY);
                ctx.stroke();
                ctx.fill();
            }
            if(tool == "eraser")
            {
                ctx.globalCompositeOperation="destination-out";
                ctx.putImageData(snapshot, 0, 0);
                ctx.arc(prevMouseX,prevMouseY,8,0,Math.PI*2,false);
                ctx.moveTo(e.offsetX, e.offsetY);
                ctx.stroke();
                ctx.fill();
            }
        }
        prevMouseX = e.offsetX;
        prevMouseY = e.offsetY;
    }
}

function updateCustomColor() {
    const colorPicker = document.getElementById("custom");
    const colorDisplay = document.getElementById("colorDisplay");
    colorDisplay.style.backgroundColor = colorPicker.value;
    x=colorValue;
}




function strokeSize() {
    const slider = document.getElementById("slider");
    y = slider.value;
}


function HotKeys() {

    document.addEventListener('keydown', function (event) {
        if (event.ctrlKey && event.key === 'z') {

            // Prevent the default browser save action

            event.preventDefault();

            // paintStrokes.shift();

            console.log('Ctrl+Z pressed!');
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.ctrlKey && event.key === 'y') {

            // Prevent the default browser save action

            event.preventDefault();

            // Do something when Ctrl+S is pressed



            console.log('Ctrl+Y pressed!');
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key == 'r') {
            event.preventDefault();
            erase();
        }
    });
}
