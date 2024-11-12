var canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;
const inputcolor = document.getElementById('custom');

var x = "black",
    y = 2;

function init() {
    canvas = document.getElementById('can');
    ctx = canvas.getContext("2d");
    HotKeys();
    w = canvas.width;
    h = canvas.height;

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
    inputcolor.addEventListener('input', (event) => {

        const colorValue = event.target.value;
        x = colorValue;
    }), false;


    if (obj.id == "white") {
        x = "white";

    }
    if (obj.id == "colorDisplay") {
        x = color.value
    }

    if (x == "white") y = 14;
    else y = 2;

}

function draw() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
}

function erase() {
    var m = confirm("Want to clear");
    if (m) {
        ctx.clearRect(0, 0, w, h);
        document.getElementById("canvasimg").style.display = "none";
    }
}

function save() {
    document.getElementById("canvasimg").style.border = "2px solid";
    var dataURL = canvas.toDataURL();
    document.getElementById("canvasimg").src = dataURL;
    document.getElementById("canvasimg").style.display = "inline";
}

function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;
    }
    flag = true;
    dot_flag = true;
    if (dot_flag) {
        ctx.beginPath();
        ctx.fillStyle = x;
        ctx.fillRect(currX, currY, 2, 2);
        ctx.closePath();
        dot_flag = false;
    }

    function color(obj) {
        inputcolor.addEventListener('input', (event) => {

            const colorValue = event.target.value;
            x = colorValue;
        }), false;


        if (obj.id == "white") {
            x = "white";

        }
        if (obj.id == "colorDisplay") {
            x = color.value
        }

        if (x == "white") y = 14;
        else y = 2;

    }

    function updateCustomColor() {
        const colorPicker = document.getElementById("custom");
        const colorDisplay = document.getElementById("colorDisplay");
        colorDisplay.style.backgroundColor = colorPicker.value;
    }

    function draw() {
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(currX, currY);
        ctx.strokeStyle = x;
        ctx.lineWidth = y;
        ctx.stroke();
        ctx.closePath();
    }

    function erase() {
        ctx.clearRect(0, 0, w, h);
        document.getElementById("canvasimg").style.display = "none";
    }
    function updateCustomColor() {
        const colorPicker = document.getElementById("custom");
        const colorDisplay = document.getElementById("colorDisplay");
        colorDisplay.style.backgroundColor = colorPicker.value;
    }

    function draw() {
        ctx.beginPath();

        ctx.moveTo(prevX, prevY);
        ctx.lineTo(currX, currY);
        ctx.strokeStyle = x;
        ctx.lineWidth = y;
        ctx.strokeSize = y;
        ctx.stroke();
        ctx.closePath();
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
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;

            flag = true;
            dot_flag = true;
            if (dot_flag) {
                ctx.beginPath();
                ctx.fillStyle = x;
                ctx.fillRect(currX, currY, 2, 2);
                //ctx.closePath();
                dot_flag = false;
            }
        }
        if (res == 'up' || res == "out") {
            flag = false;
        }
        if (res == 'move') {
            if (flag) {
                prevX = currX;
                prevY = currY;
                currX = e.clientX - canvas.offsetLeft;
                currY = e.clientY - canvas.offsetTop;
                draw();
            }
        }
    }
    function HotKeys() {

        document.addEventListener('keydown', function (event) {
            if (event.ctrlKey && event.key === 'y') {

                // Prevent the default browser save action

                event.preventDefault();

                // Do something when Ctrl+S is pressed

                console.log('Ctrl+Y pressed!');
            }
        });

        document.addEventListener('keydown', function (event) {
            if (event.ctrlKey && event.key === 'z') {

                // Prevent the default browser save action

                event.preventDefault();

                // Do something when Ctrl+S is pressed

                console.log('Ctrl+Z pressed!');
            }
        });
    }

}