// main.js
// Dependencies: 
// Description: singleton object
// This object will be our main "controller" class and will contain references
// to most of the other objects in the game.

"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};

/*
 .main is an object literal that is a property of the app global
 This object literal has its own properties and methods (functions)
 
 */
app.main = {
	//  properties

    WIDTH : 414, 
    HEIGHT: 700,
    canvas: undefined,
    ctx: undefined,
   	PAUSED: false,
   	lastTime: 0, // used by calculateDeltaTime() 
    debug: true,
    x:100,
    y:100,
    radius:40,
    xSpeed:200,
    ySpeed:160,
    fillStyle:"red",
	state: 0, 

    STATIC : Object.freeze({
    	CIRCLE_NUM_START :100
    }),
    
    // methods
	init : function() {
		this.objs = new Array();
		
		
		
		console.log("app.main.init() called");
		// initialize properties
		this.canvas = document.querySelector('canvas');
		this.canvas.width = this.WIDTH;
		this.canvas.height = this.HEIGHT;
		this.ctx = this.canvas.getContext('2d');
		var game =  new Game(this.canvas,this.ctx);
		this.objs.push(game);

		this.canvas.onmousemove = this.doMouseMove.bind(this);
		this.canvas.onmousedown= this.doMouseDown.bind(this);
		//this.canvas.overflow= 'hidden';
		//this.canvas.onwheel = function(e){window.scrollTo(window.scrollX, window.scrollY);return true; };//.bind(this);
		//this.canvas.addEventListener("mousewheel", this.doMouseWheel.bind(this), false);
		this.canvas.addEventListener("DOMMouseScroll", this.doMouseWheel.bind(this), false);
		// start the game loop
		this.update();
	},
	doMouseWheel:function(e){
		var e = window.event || e; // old IE support
		for(var i = 0 ; i < this.objs.length;i++){
			//this.objs[i].doMouseWheel((e.wheelDelta || -e.detail) );
			this.objs[i].doMouseWheel(Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))));
		}
		e.returnValue = false; /* IE7, IE8 */
	},
	doMouseMove:function(e){
    	var pos = getMouse(e);
        this.x = pos.x;
        this.y = pos.y;

	},

    doMouseDown:function(e){
    	var pos = getMouse(e);

		
    },
    
    
	update: function(){
		this.animationID = requestAnimationFrame(this.update.bind(this));// schedule a call to update()
	 	if(this.PAUSED){
	 		this.drawPauseScreen(this.ctx);
	 		return;
	 	}
	 	var dt = this.calculateDeltaTime();
	 	 
		
		this.ctx.fillStyle = "black"; 
		this.ctx.fillRect(0,0,this.WIDTH,this.HEIGHT);
		
		for(var i = 0 ; i < this.objs.length;i++){
			this.objs[i].update(dt.toFixed(3));
		}
		
		for(var i = 0 ; i < this.objs.length;i++){
			this.objs[i].render(this.canvas,this.ctx);
		}
		//call all the updated needed things
		//this.game.update(dt.toFixed(3))
		//then render the whole thing
        //this.render(this.canvas, this.ctx);
        
		if (this.debug){
			this.fillText("dt: " + dt.toFixed(3), this.WIDTH - 150, this.HEIGHT - 10, "18pt courier", "white");
		}
		if(this.state== 0){
			var x = this.x - this.WIDTH/2;
			var y = this.y - this.HEIGHT/2;
			var p = Math.sqrt(x*x+ y*y);
			var ratio = -1 +(1- p /(this.WIDTH*.5)  )* 2.0	;
		}
		
	},
    render:function(canvas, ctx){
		this.game.render(canvas, ctx)
    },
	drawPauseScreen:function(ctx){
		ctx.save();
		ctx.fillStyle = "black";
		ctx.fillRect(0,0,this.WIDTH,this.HEIGHT);
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		this.fillText("...PAUSE...", this.WIDTH/2, this.HEIGHT/2, "40pt courier","white");
		ctx.restore();
	},
	circleHitLeftRight: function(x,y,radius){
		if( x< radius || x > this.WIDTH - radius){
			return true;
		}
	},
	circleHitTopBottom: function(x,y,radius){
		if(y < radius || y > this.HEIGHT - radius){
			return true;
		}
	},
	
	fillText: function(string, x, y, css, color) {
		this.ctx.save();
		// https://developer.mozilla.org/en-US/docs/Web/CSS/font
		this.ctx.font = css;
		this.ctx.fillStyle = color;
		this.ctx.fillText(string, x, y);
		this.ctx.restore();
	},
	
	calculateDeltaTime: function(){
		var now,fps;
		now = performance.now(); 
		fps = 1000 / (now - this.lastTime);
		fps = clamp(fps, 12, 60);
		this.lastTime = now; 
		return 1/fps;
	}
	
    
    
}; // end app.main