function pen(ctx, e, snapshot) 
{
    ctx.shadowBlur = 0;
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.globalCompositeOperation="source-over";  
    ctx.putImageData(snapshot, 0, 0);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
}

function eraser(ctx, e, snapshot)
{
    ctx.shadowBlur = 0;
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.globalCompositeOperation="destination-out";
    ctx.putImageData(snapshot, 0, 0);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
}

function shadowbrush(ctx,e,snapshot, y, x)
{
    ctx.globalCompositeOperation="source-over";  
    ctx.putImageData(snapshot, 0, 0);
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.shadowBlur = y;
    ctx.shadowColor = x;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    
}
