'use strict';
var Scene = {
    width: 0,
    height: 0,
    cells: [],
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
    draw() {
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
    drawCellsPosition(cell) {
        let cellPosPx = App.getPosPx(cell);
        App.ctx.font = "10px Courier New";
        App.ctx.fillStyle = "#cccccc";
        App.ctx.fillText('' + cell.x + ':' + cell.y, cellPosPx.x, cellPosPx.y + 8);
    },
    setCell(posCanvas, posTSet) {
        this.cells[posCanvas.x][posCanvas.y] = posTSet;
    },
    getRoadmap(posFrom, posTo, path) {
        if (undefined === path) {
            path = [];
            path.push([{
                cell: posFrom,
                parentCell: undefined
            }])
            if (this.isCellEq(posFrom, posTo)) {
                return [posFrom];
            }
        }
        // Состовляем список точек поиска для предыдущего шага
        var listNewPosCheck = getCheckCells.call(this, path[path.length - 1]);
        // Выход, если для текущего шага нет точек поиска.
        if (listNewPosCheck.length < 1) {
            return false;
        }
        let newCells = [];
        for (let i = 0; i < listNewPosCheck.length; i++) {
            if (this.isCellEq(posTo, listNewPosCheck[i].cell)) {
                return getPath(listNewPosCheck[i]);
            } else {
                newCells.push(listNewPosCheck[i]);
            }
        }
        path.push(newCells);
        console.log('Шаг', path.length);
        if (path.length  > 15){
            alert('Алгоритм поиска пути долго работает с путями длиннее 15ти клеток');
            return false;
        }
        return this.getRoadmap(posFrom, posTo, path);

        function getCheckCells(listCells) {
            let result = [];
            listCells.forEach((parentCell) => {
                let newCellsRaw = [
                    App.getPosCell(parentCell.cell.x - 1, parentCell.cell.y)
                    , App.getPosCell(parentCell.cell.x + 1, parentCell.cell.y)
                    , App.getPosCell(parentCell.cell.x, parentCell.cell.y - 1)
                    , App.getPosCell(parentCell.cell.x, parentCell.cell.y + 1)
                ];
                newCellsRaw.forEach((newCell) => {
                    if (this.isCellInField(newCell)) {
                        if(this.isCellFree(newCell)){
                            if (!isCellInParent.call(this, newCell)) {
                                result.push({
                                    cell: newCell,
                                    parentCell: parentCell
                                });
                            }
                        }
                    }
                });
            });
            return result;
        }
        function isCellInParent(cell){
            for (let i = path.length - 1; i >= 0; i--) {
                for (let n = path[i].length - 1; n >= 0; n--) {
                    if (this.isCellEq(cell, path[i][n].cell)) {
                        return true;
                    }
                }
            }
            return false;
        }

        /**
         * Возвращает путь для ноды. От ноды до корня.
         * @param node
         * @returns {Array}
         */
        function getPath(node) {
            let result = [];
            do{
                result.push(node.cell);
                node = node.parentCell;
            }while (node !== undefined)
            return result;
        }

        return false;
    },
    isCellInField(cell) {
        if (cell.x < 0 || cell.y < 0) {
            return false;
        } else if (cell.x > this.width - 1 || cell.y > this.height - 1) {
            return false;
        }
        return true;
    },
    isCellEq(cell1, cell2) {
        return cell1.x === cell2.x && cell1.y === cell2.y
    },
    isCellIn(cell, list) {
        for (let i = list.length - 1; i >= 0; i--) {
            if (this.isCellEq(cell, list[i])) {
                return true
            }
        }
        return false;
    },
    isCellFree(cell) {
        let tSetCell =  this.cells[cell.x][cell.y];
        if (this.isCellEq(tSetCell, App.spriteBackground)
            || this.isCellEq(tSetCell, App.spriteRoad)
        ) {
            return true;
        }
        return false;
    }
    ,
    setMatrix(matrix, posCanvas) {
        matrix.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                this.setCell(App.getPosCell(posCanvas.x + colIndex, posCanvas.y + rowIndex), matrix[rowIndex][colIndex]);
            })
        });
    },
    setList(list, posTSet) {
        list.forEach((posCanvas) => {
            this.setCell(posCanvas, posTSet);
        });
    }
}