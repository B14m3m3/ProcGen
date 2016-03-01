var canvas = document.getElementById("mycanvas");
var context = canvas.getContext("2d");
var height = canvas.height;
var width = canvas.width;
var cellsize = 10;
var cellwidth =  width / cellsize;
var cellheight = height / cellsize;
var cells;
var deathlimit = 3;
var birthlimit = 4;
var cellchance = 0.4;
window.onload = function(){
    cells = createArray(cellheight,cellwidth);
    randomize();
};

function createArray() {
    var cells = new Array(height);
    for(var i = 0; i < height; i++){
        cells[i] = new Array(width);
        for(var j = 0; j < width; j++){
            cells[i][j] = 0;
        }
    }

    return cells;
}

function clearCanvas() {
    context.clearRect(0, 0, width, height);
}

function initializeCells() {

    for (var cellI = 0; cellI < cellheight; cellI++) {
         for (var cellJ = 0; cellJ < cellwidth; cellJ++) {
            var on = Math.random() < cellchance;
            if (cellI == 0 ||  cellJ == 0 || cellJ == cellwidth-1 || cellI == cellheight-1) {
                on = true;
            }
            cells[cellI][cellJ] = on ? 1 : 0;
         }
    }
}

function drawArray(){
    for(var cellI = 0; cellI < cellheight; cellI++){
        for(var cellJ = 0; cellJ < cellwidth; cellJ++){
            if(cells[cellI][cellJ]){
                context.fillRect(cellJ*cellsize,cellI*cellsize,cellsize,cellsize);
            }
        }
    }
}

function randomize(){
    initializeCells();
    refresh();
}

function refresh(){
    clearCanvas();
    drawArray();
    window.cells = cells;
}

function applyCells(){
    var newArray = createArray();
    for(var cellI = 0; cellI < cellheight; cellI++){
        for(var cellJ = 0; cellJ < cellwidth; cellJ++){
            var neighbours = countLiveNeighbours(cellI,cellJ);
            if(cells[cellI][cellJ]){
                if(neighbours < deathlimit){
                    newArray[cellI][cellJ] = false;
                }else{
                    newArray[cellI][cellJ] = true;
                }
            }else{
                if(neighbours > birthlimit){
                    newArray[cellI][cellJ] = true;
                }else{
                    newArray[cellI][cellJ] = false;
                }
            }
        }
    }
    cells = newArray;
    refresh();
}

function countLiveNeighbours(pointx,pointy){
    var count = 0;
    for(var x = -1; x < 2; x++){
        for(var y = -1; y < 2; y++){
          if(pointy+y < 0 || pointx+x < 0 || pointy+y > cellheight-1 || pointx+x > cellheight-1) {
                count++;
            }
            else if(x == 0 && y == 0){
                //don't count self
            }
            else{
                count += cells[pointx+x][pointy+y];
            }
        }

    }
    return count;
}

function test(){
    //console.log(cells[1][1]);
    //console.log(cells[1][2]);
    //console.log(cells[1][3]);
    //console.log(countLiveNeighbours(2,2));
}






