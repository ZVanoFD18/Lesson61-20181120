'use strict';
var App = {
    /**
     * @type {Image}
     */
    tset :undefined,
    /**
     * @type {HTMLCanvasElement}
     */
    canvas : undefined,
    /**
     * @type {CanvasRenderingContext2D}
     */
    ctx : undefined,
    spriteW : 32,
    spriteH : 32,
    spriteGrass : {},
    mapHouse : [],
    /**
     * @type {{x: *, y: *}}
     */
    spriteBackground : undefined,
    /**
     * @type {{x: *, y: *}}
     */
    spriteRoad : undefined,
    _init (){
        this.tset = document.querySelector('#tailset');
        this.canvas = document.querySelector('#canvasOut');
        this.ctx = this.canvas.getContext('2d');
        this.spriteBackground = this.getPosCell(0, 3);
        this.spriteGrass = this.getPosCell(0, 3);
        this.spriteRoad = this.getPosCell(0, 2);
        this.mapHouse = [
            [this.getPosCell(0, 0), this.getPosCell(1, 0), this.getPosCell(2, 0)],
            [this.getPosCell(0, 1), this.getPosCell(1, 1), this.getPosCell(2, 1)],
            [this.getPosCell(2, 3), this.getPosCell(1, 2), this.getPosCell(2, 3)],
            [this.getPosCell(2, 3), this.getPosCell(1, 3), this.getPosCell(2, 3)]
        ]
    },
    run(){
        App._init();
        this.tset.onload = ()=> {
            this._run();
        }
    },
    _run(){
        let house1pos = this.getPosCell(1, 3),
            house2pos = this.getPosCell(15, 7),
            roadPos1 = this.getCPosHouseRoadPoint(house1pos),
            roadPos2 = this.getCPosHouseRoadPoint(house2pos)
        ;
        Scene.init();
        // Scene.setCell(this.getPosCell(0, 0), this.getPosCell(0, 0));
        // Scene.setCell(this.getPosCell(1, 1), this.spriteGrass);
        // Scene.setCell(this.getPosCell(2, 2), this.spriteRoad);
        // Scene.setCell(roadPos1, this.spriteRoad);
        // Scene.setCell(roadPos2, this.spriteRoad);

        Scene.setMatrix(this.mapHouse, house1pos);
        Scene.setMatrix(this.mapHouse, house2pos);
        Scene.draw();
    },
    /**
     * Возвращет координаты страйта, завернутые в объект
     * @param x
     * @param y
     * @returns {{x: *, y: *}}
     */
    getPosCell(x, y) {
        return {
            x: x,
            y: y
        };
    },
    getPosPx(cell){
        let pos = {
            x : cell.x * this.spriteW,
            y : cell.y * this.spriteH
        }
        return pos;
    },
    getCPosHouseRoadPoint(housePos){
        let pos = this.getPosCell(housePos.x + 1, housePos.y + 4);
        return pos;
    }
};