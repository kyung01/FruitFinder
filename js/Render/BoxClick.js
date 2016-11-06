"use strict";
//used as a simple wraper for testing screen click event
class BoxClick{
	constructor(x, y, width ,height){
		this.pos = {x:x, y:y};
		this.size = {width:width,height:height};
	}
	isAt(x,y){
		return ( x > this.pos.x && x < this.pos.x + this.size.width) && (y > this.pos.y && y < this.pos.y + this.size.height);
	}
	
}