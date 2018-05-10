game.newLoopFromConstructor('game', function () {


		var bg1 = [], oldB;
		OOP.forInt(50, function (i) {
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



	var imag = pjs.tiles.newImage('img/immm.png');
	var anim = imag.getAnimation(0, 0, 92, 64, 3);

	var player = game.newAnimationObject({
		animation : anim,
		positionC : point(game.getWH().w /2 , game.getWH().h / 2),
		w : 92, h : 64,
		delay : 10,
		scale : 0.7
});



	this.update = function (){
			game.clear();

			drawBg();

			player.draw();

			if(mouse.isPress('LEFT')){
				return game.setLoop('level1');
			}

			brush.drawText({
				text : 'CLICK',
				x : game.getWH().w/2 - 120, y : game.getWH().h/4,
				size : 130,
				color : '#FFFFFF',
				strokeColor : '#000',
				strokeWidth : 3,
				font : 'myFont2',
			});


			//camera.follow(player , 50);

	};

	 this.entry = function (){
	 		
	 };

});