var pjs = new PointJS(640, 480, {
		backgroundColor : "#C9D6FF", 
		});
	pjs.system.initFullPage();

	var log 	= pjs.system.log;
	var game 	= pjs.game;
	var point 	= pjs.vector.point;
    var camera 	= pjs.camera;
    var brush 	= pjs.brush;
    var OOP 	= pjs.OOP;
    var math 	= pjs.math; 
    var width	= pjs.game.getWH().w;
    var height 	= pjs.game.getWH().h;
    var s 		= pjs.vector.size;

    var mouse = pjs.mouseControl.initMouseControl();
    //var key = pjs.keyControl.initKeyControl();

    var sckore = 0;
    var record = 0;