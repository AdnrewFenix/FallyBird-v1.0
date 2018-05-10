function Editor() {

	var cellW = 100;
	var	cellH = 100;

	var curPos = point();


	var moveCamera = function () {
		if(key.isDown('D'))
			camera.move(point(+1, 0));
		if(key.isDown('A'))
			camera.move(point(-1, 0));
		if(key.isDown('W'))
			camera.move(point(0, -1));
		if(key.isDown('S'))
			camera.move(point(0, +1));
		};
	var drawTiles = function () {
		OOP.forArr(tiles, function (el, id) {
			el.draw();
			if(mouse.isPeekObject('MIDDLE', el)){
				return tiles.splice(id, 1);
			}

		});
	};	

	var updateCursor = function (mr){
		curPos.x = cellW * Math.floor(mr.x / cellW);
		curPos.y = cellH * Math.floor(mr.y / cellH);

	};

	var drawCell = function (){
		brush.drawRect({
			x : curPos.x,
			y : curPos.y,
			w : cellW,
			h : cellH,
			strokeColor : "red",
			strokeWidth : 2
		});
	};		
 
 	var tiles = [];
 	var type = 0;
 	var addTile = function (){
 		if(!type){
 			tiles.push(game.newRectObject({
 				x : curPos.x,
 				y : curPos.y,
 				w : cellW,
 				h : cellH,
 				fillColor : pjs.colors.randomColor(100, 200)
 			}));
 		}
 	}; 

	this.update = function (){
		game.clear();
		updateCursor(mouse.getPosition());
		moveCamera();
		drawCell();
		drawTiles();

		if(mouse.isPress('LEFT')){
			addTile();
		}
	};
	
}


game.newLoopFromClassObject('editor', new Editor());