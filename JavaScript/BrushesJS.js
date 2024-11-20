function pen(ctx, e, snapshot) 
{
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.globalCompositeOperation="source-over";  
    ctx.putImageData(snapshot, 0, 0);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
}

function eraser(ctx, e, snapshot)
{
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.globalCompositeOperation="destination-out";
    ctx.putImageData(snapshot, 0, 0);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
}

function highlighter(ctx)
{
    ctx.globalCompositeOperation="destination-out";
    ctx.putImageData(snapshot, 0, 0);
    // ctx.arc(prevMouseX,prevMouseY,8,0,Math.PI*2,false);
    // ctx.moveTo(e.offsetX, e.offsetY);
    ctx.stroke();
    // ctx.fill();
}