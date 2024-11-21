

var canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    canvasWidth = 400,
    canvasHeight = 400,
    currentCanvas = 0,
    currentStroke = 0,
    canvasStyle,
    dot_flag = false,
    isDrawing = false;

const inputcolor = document.getElementById('custom');

var colorValue,tool="pen";

let actionHistroy = [];
let redoHistory = [];
var layers = [];

var x = "black",
    y = 2;

function init() {
    canvas = document.getElementById('can1');
    
    canvasStyle = document.getElementById('can1');
    HotKeys();

    w = canvas.width;
    h = canvas.height;
    layers.push(canvas);

    currentStroke = 0;
    currentCanvas = 0;
    w = layers[currentCanvas].width;
    h = layers[currentCanvas].height;
    changeCurrentCanvasContext();
    ctx.fillStyle = "white";
    //ctx.fillRect(0, 0, w, h);

    changeCurrentCanvasContext();


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
    ctx = layers[currentCanvas].getContext('2d');
    document.getElementById("currentLayerDisplay").innerHTML = currentCanvas;
    document.getElementById("layersDisplay").innerHTML = layers.length;
    
    layers[currentCanvas].addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    layers[currentCanvas].addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    layers[currentCanvas].addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    layers[currentCanvas].addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
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

    snapshot = ctx.getImageData(0, 0, layers[currentCanvas].width, layers[currentCanvas].height);
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
            prevMouseX = e.offsetX;
            prevMouseY = e.offsetY;

            // actionHistory.push({ type: 'line', x1: prevX, y1: prevY, x2: e.clientX, y2: e.clientY });
            // redoHistory = []; // Clear redo history
        }
    }
}

function updateCustomColor() {
    const colorPicker = document.getElementById("custom");
    const colorDisplay = document.getElementById("colorDisplay");
    x = colorPicker.value;
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

            //paintStrokes[currentStroke - 1];

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

    document.addEventListener('keydown', function (event) {
        if (event.key == 'e') {

            event.preventDefault();
            eraser();
        } 
    });

    document.addEventListener('keydown', function (event) {
       if (event.key == 'p') {

        event.preventDefault();
        pen();
       } 
    });
}
