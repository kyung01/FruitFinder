
"use strict";
class Ball{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.radius = 20;
		this.xSpeed = 100;
		this.ySpeed = 100;
		this.color = new RGBA(255,0,0,1);
	}
	getX(){
		return this.x;
	}
	getY(){
		return this.y;
	}
	getColor(){
		return this.color;
	}
}