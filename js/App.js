'use strict';
var App = {
    /**
     * @type {Image}
     */
    tset :undefined,
    /**
     * @type {Canvas}
     */
    canvas : undefined,
    ctx : undefined,
    spriteW : 32,
    spriteH : 32,
    spriteGrass : {},
    mapHouse : [],
    init (){
        this.tset = document.querySelector('#tailset');
        this.canvas = document.querySelector('#canvasOut');
        this.ctx = this.canvas.getContext('2d');
        this.spriteGrass = app.getSprite(1, 4);
        this.mapHouse = [
            [app.getSprite(0, 0), app.getSprite(1, 0), app.getSprite(2, 0)],
            [app.getSprite(0, 1), app.getSprite(1, 1), app.getSprite(2, 1)],
            [app.getSprite(2, 3), app.getSprite(1, 2), app.getSprite(2, 3)],
            [app.getSprite(2, 3), app.getSprite(1, 3), app.getSprite(2, 3)]
        ]
    },
    run(){
        App.init();
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

    },
    /**
     * Возвращет координаты страйта, завернутые в объект
     * @param x
     * @param y
     * @returns {{x: *, y: *}}
     */
    getSprite(x, y) {
        return {
            x: x,
            y: y
        };
    },
};