
let cellSize = 10; 

window.onload = function(){
    let canvas = <HTMLCanvasElement> document.getElementById("mycanvas");

    let cellMap : CellMap = new CellMap(canvas.height, canvas.width, cellSize);
    let canvasMap : CanvasMap = new CanvasMap(canvas, cellSize);

    //cellMap.init();

    cellMap.iterator(cellMap.tester);
    

    console.log(cellMap.getCells());
    
    //canvasMap.update(cellMap.getCells());
}

enum Color{
    Black,
    White
}

class CellMap{
    
    deathlimit : number = 3;
    birthlimit : number = 4;
    cellChance : number = 0.4;

    cellWidth : number;
    cellHeight : number;
    cellSize : number;

    cells : number[][];

    constructor(height : number, width : number, cellSize : number){
        this.cellWidth = width / cellSize;
        this.cellHeight = height / cellSize;
        this.cellSize = cellSize;
        this.createCells();
    }

    createCells(){
        this.cells = new Array(this.cellHeight);
        for(var i = 0; i < this.cellHeight; i++){
            this.cells[i] = new Array(this.cellHeight);
            for(var j = 0; j < this.cellWidth; j++){
                this.cells[i][j] = Color.Black;
            }
        }
    }

    iterator(x: (i : number, j : number) => Color){
        for (var _i = 0; _i < this.cells.length; _i++) {
            for(var _j = 0; _j < this.cells[_i].length; _j++){
                this.cells[_i][_j] = x(_i,_j);
            }        
        }
    }
    
    init(){  
        for (var _i = 0; _i < this.cells.length; _i++) {
            for(var _j = 0; _j < this.cells[_i].length; _j++){
                if(_i <= 0 || _j <= 0 || _i >= this.cellHeight-1 || _j >= this.cellWidth-1){
                    this.cells[_i][_j] = Color.Black;
                }else{
                    this.cells[_i][_j] = Math.random() < this.cellChance ? Color.Black : Color.White;
                }
            }        
        }
    }

    tester(_i : number, _j : number) : Color{
        if(_i <= 0 || _j <= 0 || _i >= this.cellHeight-1 || _j >= this.cellWidth-1){
            return this.cells[_i][_j] = Color.Black;
        }
        return this.cells[_i][_j] = Math.random() < this.cellChance ? Color.Black : Color.White;
                
    }

    getCells() : number[][]{
        return this.cells;
    }
}


class CanvasMap{

    canvas : HTMLCanvasElement;
    context : any;
    height : number;
    width : number;
    cellSize : number;

    cells : Color[][];
     
    constructor(canvas : HTMLCanvasElement, cellSize : number){
        this.canvas = canvas; 
        this.context = canvas.getContext("2d");
        this.height = canvas.height;
        this.width = canvas.width;
        this.cellSize = cellSize;
        this.createCells();
    }

    createCells() {
        
    }

    drawArray(){
        for(var _i = 0; _i < this.height; _i++){
          for(var _j = 0; _j < this.width; _j++){
                if(this.cells[_i][_j] == Color.Black){
                    this.context.fillRect(_j*this.cellSize,_i*this.cellSize,this.cellSize,this.cellSize);
                }
            }
        }
    }

    update(arr :  Color[][]){
        this.cells = arr;
        this.drawArray();
    }
}