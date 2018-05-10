game.newLoopFromConstructor('ameOver', function () {
	
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

	this.update = function (){
		game.clear();
		drawBg();
	};


	this.entry = function () {

	};


});