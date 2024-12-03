
var rgbaColor, lastPoint;
var points = [];
var clientX, clientY, timeout;



function distanceBetween(point1, point2) 
{
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}
function angleBetween(point1, point2) 
{
    return Math.atan2( point2.x - point1.x, point2.y - point1.y );
}


// Brushes
function pen(ctx, e, snapshot) 
{
    //ctx.shadowBlur = 0;
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.globalCompositeOperation="source-over";  
    ctx.putImageData(snapshot, 0, 0);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
}

function eraser(ctx, e, snapshot)
{
    //ctx.shadowBlur = 0;
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.globalCompositeOperation="destination-out";
    ctx.putImageData(snapshot, 0, 0);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
}

function shadowbrush(ctx,e,prevX, prevY, hex,size)
{
    var sizeOne = size ;
    var sizeTwo = size / 20;
    var lastPoint = {x: prevX, y: prevY}
    var currentPoint = { x: e.offsetX, y: e.offsetY};
    var dist = distanceBetween(lastPoint, currentPoint);
    var angle = angleBetween(lastPoint, currentPoint);
    
    for (var i = 0; i < dist; i += 5) {
        
        x = lastPoint.x + (Math.sin(angle) * i);
        y = lastPoint.y + (Math.cos(angle) * i);
        
        var radgrad = ctx.createRadialGradient(x,y, size,x,y, size * 2);
    
        
        radgrad.addColorStop(0, convertToRGBA(hex,0.75));
        radgrad.addColorStop(0.01, convertToRGBA(hex,0.5));
        radgrad.addColorStop(1, convertToRGBA(hex,0));
        ctx.fillStyle = radgrad;
        ctx.fillRect(x-size * 2, y- size * 2, size * 4, size * 4);
        
    }
    
}

function fountainPen(ctx,e,snapshot)
{
    ctx.globalCompositeOperation="source-over";
    ctx.putImageData(snapshot, 0, 0);
    points.push
    ({ 
        x: e.offsetX, 
        y: e.offsetY,
        width: getRandomInt(3, 5)
    });
    
    for (var i = 1; i < points.length; i++) 
    {
        ctx.beginPath();
        ctx.moveTo(points[i-1].x, points[i-1].y);
        ctx.lineWidth = points[i].width;
        ctx.lineTo(points[i].x, points[i].y);
        ctx.stroke();
    }
}

function caligraphyPen(ctx,e,prevX,prevY, size)
{
    size - 10;
    ctx.globalCompositeOperation="source-over";
    ctx.lineWidth = size * 3;
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.beginPath();

    ctx.globalAlpha = size;
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    ctx.moveTo(prevX - (size * 4), prevY - (size * 4));
    ctx.lineTo(e.offsetX - (size * 4), e.offsetY - (size * 4));
    ctx.stroke();

    ctx.moveTo(prevX - (size * 2), prevY - (size * 2));
    ctx.lineTo(e.offsetX - (size * 2), e.offsetY - (size * 2));
    ctx.stroke();

    ctx.moveTo(prevX + (size * 2), prevY + (size * 2));
    ctx.lineTo(e.offsetX + (size * 2), e.offsetY + (size * 2));
    ctx.stroke();

    ctx.moveTo(prevX + (size * 4), prevY + (size * 4));
    ctx.lineTo(e.offsetX + (size * 4), e.offsetY + (size * 4));
    ctx.stroke();
}

function fun(ctx, e, hex)
{
  ctx.lineWidth = 1;
  points.push({ x: e.offsetX, y: e.offsetY });
  ctx.beginPath();
  ctx.moveTo(points[points.length - 2].x, points[points.length - 2].y);
  ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
  ctx.stroke();
  
  for (var i = 0, len = points.length; i < len; i++) {
    dx = points[i].x - points[points.length-1].x;
    dy = points[i].y - points[points.length-1].y;
    d = dx * dx + dy * dy;

    if (d < 1000) {
      ctx.beginPath();
      ctx.strokeStyle = convertToRGBA(hex, 0.3);
      ctx.moveTo( points[points.length-1].x + (dx * 0.2), points[points.length-1].y + (dy * 0.2));
      ctx.lineTo( points[i].x - (dx * 0.2), points[i].y - (dy * 0.2));
      ctx.stroke();
    }
  }
    
}

function airBrush(ctx, e,size)
{
    var density = size * 2;
    ctx.moveTo(e.offsetX, e.offsetY);
    for (var i = density; i--; ) {
        var radius = size;
        var offsetX = getRandomInt(-radius, radius);
        var offsetY = getRandomInt(-radius, radius);
        ctx.fillRect(e.offsetX + offsetX, e.offsetY + offsetY, 1, 1);
    }
}

function convertToRGBA(hex, value) {
  
    const hexColor = hex
    

    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    // Create RGBA string
    return `rgba(${r}, ${g}, ${b}, ${value})`;
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
