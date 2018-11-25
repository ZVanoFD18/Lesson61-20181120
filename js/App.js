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
    house1pos : undefined,
    house2pos : undefined,
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
        ];
        this.house1pos = this.getPosCell(1, 1);
        this.house2pos = this.getPosCell(3, 5);
        document.querySelector('#buttonNewPos').onclick = ()=>{
            // alert('newPos');
            this.setHosesPosRandom();
            this._run();
        }
    },
    run(){
        App._init();
        this.tset.onload = ()=> {
            this._run();
        }
    },
    _run(){
        let roadPos1 = this.getCPosHouseRoadPoint(this.house1pos),
            roadPos2 = this.getCPosHouseRoadPoint(this.house2pos)
        ;
        Scene.init();
        // Scene.setCell(this.getPosCell(0, 0), this.getPosCell(0, 0));
        // Scene.setCell(this.getPosCell(1, 1), this.spriteGrass);
        // Scene.setCell(this.getPosCell(2, 2), this.spriteRoad);
        // Scene.setCell(roadPos1, this.spriteRoad);
        // Scene.setCell(roadPos2, this.spriteRoad);

        Scene.setMatrix(this.mapHouse, this.house1pos);
        Scene.setMatrix(this.mapHouse, this.house2pos);
        var roadmap = Scene.getRoadmap(roadPos1, roadPos2);
        if (false !== roadmap){
            Scene.setList(roadmap, this.spriteRoad);
        }
        Scene.draw();
    },
    setHosesPosRandom(){
        this.house1pos = this.getPosCell(
            Math.max(0, Math.floor(Math.random() * Scene.width - 3)),
            Math.max(0,Math.floor(Math.random() * Scene.height - 6)))
        ;
        this.house2pos = this.getPosCell(
            Math.max(0, Math.floor(Math.random() * Scene.width - 3)),
            Math.max(0,Math.floor(Math.random() * Scene.height - 6)))
        ;
        // @TODO: DEBUG/ позиция выхода из дома за пределами поля
        // this.house1pos = this.getPosCell(7, 6);
        // this.house2pos = this.getPosCell(8, 8);

        // this.house1pos = this.getPosCell(5, 0);
        // this.house2pos = this.getPosCell(21, 5);

        console.log('Новая позиция дома1', this.house1pos);
        console.log('Новая позиция дома2', this.house2pos);
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