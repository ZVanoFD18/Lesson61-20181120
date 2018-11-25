'use strict';
document.addEventListener("DOMContentLoaded", function () {
    var tset = document.querySelector('#tailset'),
        canvas = document.querySelector('#canvasOut'),
        ctx = canvas.getContext('2d'),
        spriteW = 32,
        spriteH = 32,
        spriteGrass = {
            x: 1,
            y: 4
        },
        mapHouse = [
            [gs(0, 0), gs(1, 0), gs(2, 0)],
            [gs(0, 1), gs(1, 1), gs(2, 1)],
            [gs(2, 3), gs(1, 2), gs(2, 3)],
            [gs(2, 3), gs(1, 3), gs(2, 3)],
        ]
    ;

    function gs(x, y) {
        return {x: x, y: y};
    }

    function drawCells() {
        ctx.strokeStyle = '#cccccc';
        ctx.beginPath();
        for (var x = 0; x < Math.floor(canvas.width / spriteW); x++) {
            ctx.moveTo(x * spriteW, 0);
            ctx.lineTo(x * spriteW, canvas.height);
            ctx.moveTo(0, x * spriteW, 0);
            ctx.lineTo(canvas.width, x * spriteW);
        }
        ctx.stroke();
    }

    function fillField() {
        for (var x = 0, cntX = Math.floor(canvas.width / spriteW); x < cntX; x++) {
            for (var y = 0, cntY = Math.floor(canvas.height / spriteH); y < cntY; y++) {
                drawSprite(x, y, 0, 3);
            }
        }
    }

    function drawSprite(posX, posY, tsetX, tsetY) {
        var outXPx = posX * spriteW,
            outYPx = posY * spriteH,
            tsetXPx = tsetX * spriteW,
            tsetYPx = tsetY * spriteH
        ;
        ctx.drawImage(tset,
            tsetXPx, tsetYPx, spriteW, spriteH, // Что выводим (спрайт из tset)
            outXPx, outYPx, spriteW, spriteH // Куда выводим - позиция в canvas
        );
    }

    function getRoadmap(fromX, fromY, toX, toY) {
        var roadmap = [];
        for (var x = fromX; x <= toX; x++) {
            // for (var y = fromY; y <= toY; y++) {
            //     roadmap.push(gs(x, y));
            // }
            roadmap.push(gs(
                x,
                fromY + Math.floor((toY - fromY)/fromX + Math.floor((toX - x)/x))
            ));
        }
        return roadmap;
    }

    function drawMatrix(matrix, posX, posY) {
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
    }

    function drawSprites(tsetX, tsetY, cells) {
        cells.forEach((cellPos) => {
            drawSprite(cellPos.x, cellPos.y, tsetX, tsetY);
        });
    }

    tset.onload = function () {
        //ctx.drawImage(tset, 0, 0);
        //ctx.drawImage(tset, 0, 0, 100, 200);
        // ctx.drawImage(tset,
        //     spriteGrass.x, spriteGrass.y, spriteW, spriteH,
        //     0, 0, spriteW , spriteH
        // );
        fillField();
        drawMatrix(mapHouse, 1, 1);
        drawMatrix(mapHouse, 15, 7);
        drawSprites(0, 2, getRoadmap(2, 5, 16, 11));
        drawCells();
    }
});
