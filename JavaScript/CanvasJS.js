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

function color()
{
    x = colorValue;
}

function SetTool(obj) {
    tool = obj.id
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
            ctx.moveTo(e.offsetX, e.offsetY);

    snapshot = ctx.getImageData(0, 0, layers[currentCanvas].width, layers[currentCanvas].height);
        }
    }
    if (res == 'up') {
        isDrawing = false;
    }
    if (res == 'move') {
        if (isDrawing) {
            switch(tool)
            {
                case "pen":
                    pen(ctx, e, snapshot);
                    break;
                case "eraser":
                    eraser(ctx, e, snapshot);
                    break;
            //    case "airbrush":
            //         shadowbrush(ctx,e,snapshot,y,x);
            //    break;

            }
        }
        prevMouseX = e.offsetX;
        prevMouseY = e.offsetY;
    }
}

function ImportImage()
{
    addLayer();
    ctx = layers[currentCanvas - 1].getContext("2d");
    imageInput.addEventListener("change", (event) => {
        // Get the selected file
        const file = event.target.files[0];
        
        if (file) {
            const reader = new FileReader();
    
            // When the file is loaded
            reader.onload = (e) => {
                const img = new Image(); // Create a new Image object
                img.src = e.target.result; // Set the source to the file's data URL
    
                img.onload = () => {
                    // Draw the image onto the canvas
                    
                    ctx.drawImage(img, 10, 10); // Draw image
                };
            };
    
           // ctx.putImageData(snapshot, 0, 0);
            reader.readAsDataURL(file);
        }
    });

    // layers[currentCanvas - 1].addEventListener("mousedown", function (e) {
    //     ctx.drawImage(img.value,e.offsetX,e.offsetY);
    // }, false);
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

function shadowAmount() 
{
    const shadowSlider = document.getElementById("shadowSlider");
    shadowAmount = shadowSlider.value;
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
            SetTool("eraser");

            console.log('E pressed!');
        } 
    });

    document.addEventListener('keydown', function (event) {
       if (event.key == 'p') {

        event.preventDefault();
        SetTool("pen");

        console.log('P pressed!');
       } 
    });
}
