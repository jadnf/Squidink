var canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    w,
    h,
    currentCanvas,
    canvasStyle;
    dot_flag = false;
    isDrawing = false;

const inputcolor = document.getElementById('custom');

var colorValue,tool="pen";

var paintStrokes = [];
var layers = [];


var x = "black",
    y = 2;

function init() {
    canvas = document.getElementById('BackgroundCanvas');
    HotKeys();

    
   // document.getElementById("canvases").width = canvas.width;
    //document.getElementById("canvases").height = canvas.height;

    layers.push(canvas);
    
    currentCanvas = 0;
    changeCurrentCanvasContext();
    ctx.fillStyle = "white";
    //ctx.fillRect(0, 0, w, h);
    
    
}
function addLayer() {
    var newCanvas = document.createElement('canvas');
    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height;
    newCanvas.className = "Canvas"
    newCanvas.id = 'can' + (layers.length + 1);
    //newCanvas.style = `position:absolute;width:${w};height:${h};top:0;left:0;z-index:${layers.length + 1};`;
 //   newCanvas.style.position = "relative";
  //  newCanvas.width = canvas.width;
    //newCanvas.height = canvas.height;
    //newCanvas.style.top = canvas.style.top;
   // newCanvas.style.left = canvas.style.left;
    //newCanvas.style.zIndex = (layers.length + 1)+"";
    layers.push(newCanvas);
    document.getElementById("layersDisplay").innerHTML = layers.length;
    document.getElementById("canvases").append(layers[layers.length-1]);
    console.log(newCanvas.style.zIndex);
}
function changeCurrentLayer(direction) {
    if (direction == 'up' && (currentCanvas + 1) < layers.length) {
        currentCanvas += 1;
        
    } else if (direction == 'down' && (currentCanvas + 1) > 1){
        currentCanvas -= 1;
        
    }
    changeCurrentCanvasContext();
    
}
function changeCurrentCanvasContext() {
    ctx = layers[currentCanvas].getContext('2d');
    document.getElementById("currentLayerDisplay").innerHTML = currentCanvas+1;
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
    console.log("changed canvas context");
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
    }

}


function save() {
    document.getElementById("canvasimg").style.border = "2px solid";
    var dataURL = canvas.toDataURL();
    document.getElementById("canvasimg").src = dataURL;
    document.getElementById("canvasimg").style.display = "inline";
}
function erase() {

    ctx.clearRect(0, 0, w, h);
    document.getElementById("canvasimg").style.display = "none";

}

function findxy(res, e) {
    if (res == 'down') {
        isDrawing = true;
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
            if(tool == "pen")
            {
                ctx.globalCompositeOperation="source-over";  
                ctx.putImageData(snapshot, 0, 0);
                ctx.arc(prevX,prevY,y,0,Math.PI*2,false);
                ctx.moveTo(e.offsetX, e.offsetY);
                ctx.stroke();
                ctx.fill();
            }
            if(tool == "eraser")
            {
                ctx.globalCompositeOperation="destination-out";
                ctx.putImageData(snapshot, 0, 0);
                ctx.arc(prevX,prevY,8,0,Math.PI*2,false);
                ctx.moveTo(e.offsetX, e.offsetY);
                ctx.stroke();
                ctx.fill();
            }
            prevX = e.offsetX;
            prevY = e.offsetY;
        }
    }
}

function updateCustomColor() {
    const colorPicker = document.getElementById("custom");
    const colorDisplay = document.getElementById("colorDisplay");
    x = colorPicker.value;
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
