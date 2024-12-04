var canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,

    currentCanvas,
    dot_flag = false,
    currentCanvas = 1,
    canvasStyle,
    dot_flag = false,
    isDrawing = false,
    img, 
    snapshot;

const inputcolor = document.getElementById('custom');
const imageInput = document.getElementById('image');
var shadowAmount;

var colorValue,tool="pen";
// let hexValue = inputcolor.value;
// x = inputcolor.value;

var paintStrokes = [];
var layers = [];
var size = 2;


var x = "black",
    y, hexValue;

strokeSize();

function init() {
    strokeSize();
    canvas = document.getElementById('BackgroundCanvas');
   // canvas.width = 1000;
   // canvas.height = 700;
    HotKeys();
    layers.push(canvas);
    currentStroke = 0;
    currentCanvas = 0;
    
    changeCurrentCanvasContext();
    ctx.fillStyle = "white";
    

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
function removeLayer(){
    layers.splice(currentCanvas, 1);
    currentCanvas -= 1;
    changeCurrentCanvasContext();
}

function addLayer() {
    var newCanvas = document.createElement('canvas');
    newCanvas.style = canvas.style;
    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height;
    newCanvas.className = "Canvas";
    newCanvas.style.position = 'absolute';
    newCanvas.id = 'can' + (layers.length + 1);
    newCanvas.zIndex = (layers.length - 1) + '';
    layers.push(newCanvas);
    document.getElementById("layersDisplay").innerHTML = layers.length;
    document.getElementById("canvases").append(layers[layers.length-1]);
    currentCanvas = layers.length-1
    changeCurrentCanvasContext()
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
    //updateLayerDisplay();
    
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


function SetTool(obj) {
    tool = obj.id;
}


function save() {
    const link = document.createElement("a"); // creating <a> elemen
    link.download = `${Date.now()}.jpg`; // passing current date as link download value
    for(var i = 0; i < layers.length; i++) {
    link.href = layers[i].toDataURL(); // passing canvasData as link href value
    }
    link.click();
}
function erase() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
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

            //actionHistroy = layers;
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
                case "fountainPen":
                    fountainPen(ctx, e, snapshot);
                    break;
                case "smudge":
                    shadowbrush(ctx,e,prevMouseX,prevMouseY,String(hexValue),size)
                    break;
                case "caligraphy":
                    caligraphyPen(ctx,e,prevMouseX,prevMouseY,size);
                    break;
                case "funPen":
                    fun(ctx,e,String(hexValue));
                    break;
               case "airbrush":
                    airBrush(ctx,e,size);
                    break;
            }
        }
        prevMouseX = e.offsetX;
        prevMouseY = e.offsetY;
    }
}

function ImportImage()
{
    addLayer();
    ctx = layers[currentCanvas].getContext("2d");
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
    hexValue = colorDisplay.value;
}

function strokeSize() {
    const slider = document.getElementById("slider");
    y = slider.value;
    size = slider.value;
}

function shadowAmount() 
{
    const shadowSlider = document.getElementById("shadowSlider");
    shadowAmount = shadowSlider.value;
}


function HotKeys() {
    document.addEventListener('keydown', function (event) {
        if (event.ctrlKey && event.key === 'z') {

            // Prevent the default browser save action\

            event.preventDefault();

            // if (actionHistroy.length > 0)
            // {
            //     actionHistroy = 
            // }

            console.log('Ctrl+Z pressed!');
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.ctrlKey && event.key === 'y') {

            // Prevent the default browser save action

            event.preventDefault();

            // Do something when Ctrl+Yis pressed



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
            tool = "eraser";
        } 
    });

    document.addEventListener('keydown', function (event) {
       if (event.key == 'p') {

        event.preventDefault();
        tool = "pen";
       } 
    });

    document.addEventListener('keydown', function (event) {
        if (event.key == 'b') {

            event.preventDefault();
            tool = "airbrush";
        }
    });
}
