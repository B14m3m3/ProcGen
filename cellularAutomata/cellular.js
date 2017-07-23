var cellSize = 10;
window.onload = function () {
    var canvas = document.getElementById("mycanvas");
    var cellMap = new CellMap(canvas.height, canvas.width, cellSize);
    var canvasMap = new CanvasMap(canvas, cellSize);
    //cellMap.init();
    cellMap.iterator(cellMap.tester);
    console.log(cellMap.getCells());
    //canvasMap.update(cellMap.getCells());
};
var Color;
(function (Color) {
    Color[Color["Black"] = 0] = "Black";
    Color[Color["White"] = 1] = "White";
})(Color || (Color = {}));
var CellMap = (function () {
    function CellMap(height, width, cellSize) {
        this.deathlimit = 3;
        this.birthlimit = 4;
        this.cellChance = 0.4;
        this.cellWidth = width / cellSize;
        this.cellHeight = height / cellSize;
        this.cellSize = cellSize;
        this.createCells();
    }
    CellMap.prototype.createCells = function () {
        this.cells = new Array(this.cellHeight);
        for (var i = 0; i < this.cellHeight; i++) {
            this.cells[i] = new Array(this.cellHeight);
            for (var j = 0; j < this.cellWidth; j++) {
                this.cells[i][j] = Color.Black;
            }
        }
    };
    CellMap.prototype.iterator = function (x) {
        for (var _i = 0; _i < this.cells.length; _i++) {
            for (var _j = 0; _j < this.cells[_i].length; _j++) {
                this.cells[_i][_j] = x(_i, _j);
            }
        }
    };
    CellMap.prototype.init = function () {
        for (var _i = 0; _i < this.cells.length; _i++) {
            for (var _j = 0; _j < this.cells[_i].length; _j++) {
                if (_i <= 0 || _j <= 0 || _i >= this.cellHeight - 1 || _j >= this.cellWidth - 1) {
                    this.cells[_i][_j] = Color.Black;
                }
                else {
                    this.cells[_i][_j] = Math.random() < this.cellChance ? Color.Black : Color.White;
                }
            }
        }
    };
    CellMap.prototype.tester = function (_i, _j) {
        if (_i <= 0 || _j <= 0 || _i >= this.cellHeight - 1 || _j >= this.cellWidth - 1) {
            return this.cells[_i][_j] = Color.Black;
        }
        return this.cells[_i][_j] = Math.random() < this.cellChance ? Color.Black : Color.White;
    };
    CellMap.prototype.getCells = function () {
        return this.cells;
    };
    return CellMap;
}());
var CanvasMap = (function () {
    function CanvasMap(canvas, cellSize) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.height = canvas.height;
        this.width = canvas.width;
        this.cellSize = cellSize;
        this.createCells();
    }
    CanvasMap.prototype.createCells = function () {
    };
    CanvasMap.prototype.drawArray = function () {
        for (var _i = 0; _i < this.height; _i++) {
            for (var _j = 0; _j < this.width; _j++) {
                if (this.cells[_i][_j] == Color.Black) {
                    this.context.fillRect(_j * this.cellSize, _i * this.cellSize, this.cellSize, this.cellSize);
                }
            }
        }
    };
    CanvasMap.prototype.update = function (arr) {
        this.cells = arr;
        this.drawArray();
    };
    return CanvasMap;
}());
