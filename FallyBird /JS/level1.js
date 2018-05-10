game.newLoopFromConstructor('level1', function () {
//BACKGROUND
	var bg1 = [], oldB;
		OOP.forInt(3, function (i) {
		 oldB = game.newImageObject({
		 	file : 'img/bg3.png',
		 	h : game.getWH().h,
		 	onload : function () {
		 		this.x = i * this.w;
		 	}
 		 });
		 bg1.push(oldB);
		}); 

		var drawBg = function () {
			OOP.forArr(bg1, function (el) {
				el.draw();
				el.move(point(-1, 0));

				if(el.x + el.w < 0){
					el.x = oldB.x + oldB.w;
					oldB = el;
				}
			});
		};

		var map = {
		widht : 10,
		height : 10,
		source : [
			'',
			'',
			'',
			'',
			'',
			'',
			'',
			'',
			'',
			''
		]
	};

	var walls = [];
	OOP.forArr(map.source, function (string, Y){
		OOP.forArr(string , function(symbol, X){

			if (!symbol || symbol == ' ') return;

			if (symbol == '0'){
				walls.push(game.newRectObject({
					w : map.widht, h : map.height,
					x : map.widht*X, y : map.height*Y,
					fillColor : '#B64141'
				}));
			}
		});
	});

//SPRITE OF BIRD
	var imag = pjs.tiles.newImage('img/immm.png');
	var anim = imag.getAnimation(0, 0, 92, 64, 3);

	var player = game.newAnimationObject({
		animation : anim,
		positionC : point(game.getWH().w /2 , game.getWH().h / 2),
		w : 92, h : 64,
		delay : 3,
		scale : 0.7,
		userData : {
			dy : 0
		}
});
	
	player.setBox({
		offset : point(10,5),
		size : s(-20, -10)
	});

//MOUNTAINS
	var blocks = [], olBlock=false;
	var colls = [], olBlock1=false;		
	var rosBetween = 160;
	
	var addBlock = function (y) {
		var dX = olBlock ? olBlock.bottom.x + math.random(200,100) : width;
		var m1 = game.newImageObject({
			file : 'img/lev/3B.png',
			x : dX, y : 0,
			w : width / 10,
			onload : function () {
				this.y = y + rosBetween;
			}
		});
 
		var obj = {
			'bottom' : m1,
			//'top' : m2
		}
		olBlock = obj;
		blocks.push(obj);	
	};

	var addBlock2 = function (y) {
		var dX = olBlock1 ? olBlock1.top.x + math.random(400,700) : width;

		var m2 = game.newImageObject({
			file : 'img/lev/2.png',
			x : dX, y : 0,
			w : width / 17,
			//angle : 180,
			onload : function () {
				this.y = -this.h + y - rosBetween; 
			}
		});

		var obj2 = {
			'top' : m2
		}
		olBlock1 = obj2;
		colls.push(obj2);	
	};



	OOP.forInt(500, function () {
		addBlock(math.random(rosBetween, height - rosBetween));
	});
	OOP.forInt(500, function () {
		addBlock2(math.random(rosBetween, height - rosBetween));
	});

	var waves = 0;
	var score = 0;

	var drawBlocks = function () {
		OOP.forArr(blocks, function (el) {
			el.bottom.draw();
			
			el.bottom.move(point(-2.5, 0));
			
			if(el.bottom.x + el.bottom.w < 0){
				el.bottom.x = olBlock.bottom.x + olBlock.bottom.w + math.random(200,600);
			}
			

			if(el.bottom.isInCamera()){
				if(el.bottom.isIntersect(player)){
					gameOver();
				}
			}
		});
	};

	var drawBlocks2 = function () {
		OOP.forArr(colls, function (el) {
			el.top.draw();
			el.top.move(point(-2.5, 0));

			if(el.top.isInCamera()){
				if(player.isIntersect(el.top)){
					el.top.visible = false;
					score+=1;
				}
			}
		});
	};
var gameOver = function() {
	game.setLoop('GameOver');
};	
var e = game.newImageObject({
		file : 'img/ok2.png',
		x : width / 2.1, y : height / 2,
		scale : 0.05
	});
	
game.newLoop('GameOver', function () {

	game.clear();
	drawBg();
	
	
	brush.drawText({
		text : 'Ваш рекорд - '+score,
		x : width / 2.5, y : height / 3,
		size : 50,
		color : '#FFFFFF',
		font : 'myFont2'
	});
	brush.drawText({
		text : 'Взмахов - '+waves,
		x : width / 2.5, y : height / 2.5,
		size : 50,
		color : '#FFFFFF',
		font : 'myFont2'
	});
	e.draw();

	if(mouse.isPeekObject('LEFT', e)){
		game.setLoop('game');
	}
});
game.startLoop('GameOver');


	this.update = function () {
		game.clear();
		
		drawBg();
		player.draw();
		//player.drawStaticBox();
		player.dy += 0.5;
		player.y += player.dy;
		player.angle = player.dy;

		

		
		if(mouse.isPress('LEFT')){
			player.dy = -8;
			waves += 1;
		}
		
		drawBlocks();
		drawBlocks2();
		
			brush.drawText({
				text : +waves,
				size : 70,
				color : '#000',
				strokeColor : '#FFFFFF',
				strokeWidth : 2,
				font : 'myFont',
				x : 10
			});

			brush.drawText({
				text : +score,
				x : player.x + player.w/2, y : player.y - 50,
				size : 50,
				color : '#FFFFFF',
				strokeColor : '#000',
				strokeWidth : 3,
				font : 'myFont',
			});




			OOP.drawArr(walls, function (wall) {
				if (wall.isInCameraStatic()){
					if (wall.isStaticIntersect(player)){			
							if(player.speed.y > 0){
								player.speed.y *= -0.3;
							}	
						}
					}
				
			});
	};

	
	
	this.entry = function () {


		player.dy = 0;

		var blocks = [], olBlock=false;
		var colls = [], olBlock1=false;	

		OOP.forInt(500, function () {
			addBlock(math.random(rosBetween, height - rosBetween));
		});
		OOP.forInt(500, function () {
			addBlock2(math.random(rosBetween, height - rosBetween));
		});


		player.setPositionC(point(game.getWH().w /2 , 100));
		waves = 0;
		score = 0;
	};
});