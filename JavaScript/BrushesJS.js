function pen(ctx, y, prevX, prevY,e,snapshot) 
{
    ctx.lineJoin = ctx.lineCap = 'round'
    ctx.globalCompositeOperation="source-over";  
    ctx.putImageData(snapshot, 0, 0);
    ctx.arc(prevX,prevY,y,0,Math.PI*2,false);
    ctx.moveTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.fill();
}

function eraser(ctx, y, prevX, prevY, e, snapshot)
{
    ctx.globalCompositeOperation="destination-out";
    ctx.putImageData(snapshot, 0, 0);
    ctx.arc(prevMouseX,prevMouseY,8,0,Math.PI*2,false);
    ctx.moveTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.fill();
}

function highlighter(ctx, y, prevX, prevY, prev)
{
    ctx.globalCompositeOperation="destination-out";
    ctx.putImageData(snapshot, 0, 0);
    // ctx.arc(prevMouseX,prevMouseY,8,0,Math.PI*2,false);
    // ctx.moveTo(e.offsetX, e.offsetY);
    ctx.stroke();
    // ctx.fill();
}