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

function bucket(x, y, targetColor, fillColor) {
    const context = canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
  
    const stack = [[x, y]];
  
    while (stack.length > 0) {
      const [currentX, currentY] = stack.pop();
      const index = (currentY * canvas.width + currentX) * 4;
  
      if (currentX < 0 || currentX >= canvas.width || currentY < 0 || currentY >= canvas.height) {
        continue;
      }
  
      const pixelColor = [data[index], data[index + 1], data[index + 2], data[index + 3]];
  
      if (pixelColor.every((value, i) => value === targetColor[i])) {
        data[index] = fillColor[0];
        data[index + 1] = fillColor[1];
        data[index + 2] = fillColor[2];
        data[index + 3] = fillColor[3];
  
        stack.push([currentX + 1, currentY]);
        stack.push([currentX - 1, currentY]);
        stack.push([currentX, currentY + 1]);
        stack.push([currentX, currentY - 1]);
      }
    }
  
    context.putImageData(imageData, 0, 0);
  }