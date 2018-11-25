'use strict';
var scene = {
    width : 0,
    height : 0,
    cells : 0,
    cellBackground : undefined,
    init() {
        this.cellBackground =
    },
    drawCells() {
        ctx.strokeStyle = '#cccccc';
        ctx.beginPath();
        for (var x = 0; x < Math.floor(canvas.width / spriteW); x++) {
            ctx.moveTo(x * spriteW, 0);
            ctx.lineTo(x * spriteW, canvas.height);
            ctx.moveTo(0, x * spriteW, 0);
            ctx.lineTo(canvas.width, x * spriteW);
        }
        ctx.stroke();
    },
    fillField() {
        for (var x = 0, cntX = Math.floor(canvas.width / spriteW); x < cntX; x++) {
            for (var y = 0, cntY = Math.floor(canvas.height / spriteH); y < cntY; y++) {
                drawSprite(x, y, 0, 3);
            }
        }
    },
    drawSprite(posX, posY, tsetX, tsetY) {
        var outXPx = posX * spriteW,
            outYPx = posY * spriteH,
            tsetXPx = tsetX * spriteW,
            tsetYPx = tsetY * spriteH
        ;
        ctx.drawImage(tset,
            tsetXPx, tsetYPx, spriteW, spriteH, // Что выводим (спрайт из tset)
            outXPx, outYPx, spriteW, spriteH // Куда выводим - позиция в canvas
        );
    },
    getRoadmap(fromX, fromY, toX, toY) {
        var roadmap = [];
        for (var x = fromX; x <= toX; x++) {
            // for (var y = fromY; y <= toY; y++) {
            //     roadmap.push(app.getSprite(x, y));
            // }
            roadmap.push(app.getSprite(
                x,
                fromY + Math.floor((toY - fromY)/fromX + Math.floor((toX - x)/x))
            ));
        }
        return roadmap;
    },
    drawMatrix(matrix, posX, posY) {
        ctx.font = "12px Courier New";
        ctx.fillStyle = "#00ff00";
        matrix.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                console.log('x, y', rowIndex, colIndex);
                var outPosX = posX * spriteW + colIndex * spriteW,
                    outPosY = posY * spriteH + rowIndex * spriteH;
                ctx.drawImage(tset,
                    cell.x * spriteW, cell.y * spriteH, spriteW, spriteH, // Что выводим (спрайт из tset)
                    outPosX, outPosY, spriteW, spriteH // Куда выводим - позиция в canvas
                );
                ctx.fillText('' + cell.x + ':' + cell.y, outPosX, outPosY + 8);
                ctx.fillText('' + rowIndex + ':' + colIndex, outPosX, outPosY + 24);
            })
        });
    },
    drawSprites(tsetX, tsetY, cells) {
        cells.forEach((cellPos) => {
            drawSprite(cellPos.x, cellPos.y, tsetX, tsetY);
        });
    }
}