

var canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    canvasWidth = 400,
    canvasHeight = 400,
    currentCanvas = 1,
    canvasStyle;
    dot_flag = false;
    isDrawing = false;

const inputcolor = document.getElementById('custom');
var paintStrokes = [];
var layers = [];
var colorValue;

var x = "black",
    y = 2;

function init() {
    canvas = document.getElementById('can1');
    
    canvasStyle = document.getElementById('can1');
    HotKeys();

    w = canvas.width;
    h = canvas.height;
    layers.push(canvas);
    
    currentCanvas = 1;
    w = layers[currentCanvas - 1].width;
    h = layers[currentCanvas - 1].height;
    changeCurrentCanvasContext();
    ctx.fillStyle = "white";
    //ctx.fillRect(0, 0, w, h);
    
    
}
function addLayer() {
    var newCanvas = document.createElement('canvas');
    newCanvas.width = canvasWidth;
    newCanvas.height = canvasHeight;
    newCanvas.id = 'can' + (layers.length + 1);
    newCanvas.style = canvasStyle;
    layers.push(newCanvas);
    document.getElementById("layersDisplay").innerHTML = layers.length;
    document.getElementById("canvases").append(layers[layers.length-1]);
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
    document.getElementById("currentLayerDisplay").innerHTML = currentCanvas;
    document.getElementById("layersDisplay").innerHTML = layers.length;
    
    layers[currentCanvas - 1].addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    layers[currentCanvas - 1].addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    layers[currentCanvas - 1].addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    layers[currentCanvas - 1].addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
    console.log("changed canvas context");
}

function color(obj) {
    


    if (obj.id == "white") {
        x = "white";

    }
    if (obj.id == "colorDisplay") {
        x = colorValue
        strokeSize();
    }

    if (x == "white") y = 14;
    else y = 2;

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
        prevMouseX = e.offsetX;
        prevMouseY = e.offsetY;
        if (isDrawing) {
            ctx.beginPath();
            ctx.lineWidth = y;
            ctx.strokeStyle = x;
            ctx.fillStyle = x;

    snapshot = ctx.getImageData(0, 0, layers[currentCanvas - 1].width, layers[currentCanvas - 1].height);
        }
    }
    if (res == 'up') {
        isDrawing = false;
    }
    if (res == 'move') {
        if (isDrawing) {
            ctx.putImageData(snapshot, 0, 0);

            ctx.strokeStyle = x
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();

            // paintStrokes.push(ctx.stroke());

            // if (paintStrokes.length > 1499)
            // {
            //     paintStrokes.pop(0);
            //     console.log(paintStrokes);
            // }
        }
    }
}

function updateCustomColor() {
    const colorPicker = document.getElementById("custom");
    const colorDisplay = document.getElementById("colorDisplay");
    colorDisplay.style.backgroundColor = colorPicker.value;
}


function erase() {
    ctx.clearRect(0, 0, w, h);
    document.getElementById("canvasimg").style.display = "none";
}


function Caligraphy() {
    ctx.beginPath();

    for (let i = 0; i < 5; i++) {
        ctx.moveTo(prevX - i, prevY - i);
        ctx.lineTo(currX - i, currY - i);
    }
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.strokeSize = y;
    ctx.stroke();
    ctx.closePath();
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
