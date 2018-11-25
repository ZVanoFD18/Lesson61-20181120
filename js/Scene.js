'use strict';
var Scene = {
    width : 0,
    height : 0,
    cells : [],
    init() {
        this.width = Math.floor(App.canvas.width / App.spriteW);
        this.height = Math.floor(App.canvas.height / App.spriteH);
        for (let x = 0; x < this.width; x++) {
            this.cells[x] = [];
            for (let y = 0; y < this.height; y++) {
                this.cells[x][y] = App.spriteBackground;
            }
        }
    },
    draw(){
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                this.drawCell(App.getPosCell(x, y), this.cells[x][y])
                this.drawCellsPosition(App.getPosCell(x, y));
            }
        }
        this.drawGrid();
    },

    drawCell(posCanvas, posTset) {
        var posCanvasPx = App.getPosPx(posCanvas),
            posTSetPx = App.getPosPx(posTset)
        ;
        App.ctx.drawImage(App.tset,
            posTSetPx.x, posTSetPx.y, App.spriteW, App.spriteH, // Что выводим (спрайт из tset)
            posCanvasPx.x, posCanvasPx.y, App.spriteW, App.spriteH // Куда выводим - позиция в canvas
        );
    },

    drawGrid() {
        App.ctx.strokeStyle = '#cccccc';
        App.ctx.beginPath();
        for (var x = 0; x < Math.floor(App.canvas.width / App.spriteW); x++) {
            App.ctx.moveTo(x * App.spriteW, 0);
            App.ctx.lineTo(x * App.spriteW, App.canvas.height);
            App.ctx.moveTo(0, x * App.spriteW, 0);
            App.ctx.lineTo(App.canvas.width, x * App.spriteW);
        }
        App.ctx.stroke();
    },
    drawCellsPosition(cell){
        let cellPosPx = App.getPosPx(cell);
        App.ctx.font = "10px Courier New";
        App.ctx.fillStyle = "#cccccc";
        App.ctx.fillText('' + cell.x + ':' + cell.y, cellPosPx.x, cellPosPx.y + 8);
    },
    setCell(posCanvas, posTSet){
        this.cells[posCanvas.x][posCanvas.y] = posTSet;
    },
    getRoadmap(fromX, fromY, toX, toY) {
        var roadmap = [];
        for (var x = fromX; x <= toX; x++) {
            // for (var y = fromY; y <= toY; y++) {
            //     roadmap.push(App.getPosCell(x, y));
            // }
            roadmap.push(App.getPosCell(
                x,
                fromY + Math.floor((toY - fromY)/fromX + Math.floor((toX - x)/x))
            ));
        }
        return roadmap;
    },
    setMatrix(matrix, posCanvas) {
        matrix.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                this.setCell(App.getPosCell(posCanvas.x + colIndex, posCanvas.y + rowIndex), matrix[rowIndex][colIndex]);
            })
        });
    },
    drawSprites(tsetX, tsetY, cells) {
        cells.forEach((cellPos) => {
            this.drawSprite(cellPos.x, cellPos.y, tsetX, tsetY);
        });
    }
}