var canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;
const inputcolor = document.getElementById('custom');
var colorValue;

var x = "black",
    y = 2;

function init() {
    canvas = document.getElementById('can');
    ctx = canvas.getContext("2d");
    HotKeys();
    w = canvas.width;
    h = canvas.height;
    
    inputcolor.addEventListener('input', (event) => {

        colorValue = event.target.value;
        x = colorValue;
        strokeSize();
    }), false;

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
        prevMouseX = e.offsetX;
        prevMouseY = e.offsetY;
        if (isDrawing) {
            ctx.beginPath();
            ctx.lineWidth = y;
            ctx.strokeStyle = x;
            ctx.fillStyle = x;

    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
        }
    }
    if (res == 'up' || res == "out") {
        isDrawing = false;
    }
    if (res == 'move') {
        if (isDrawing) {
            ctx.putImageData(snapshot, 0, 0);

        ctx.strokeStyle = x
        ctx.lineTo(e.offsetX, e.offsetY); 
        ctx.stroke();  }
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

            // Do something when Ctrl+S is pressed

            

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
}
