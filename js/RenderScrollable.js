"use strict";

class RenderScrollable extends GameEvents{
	constructor(){
		super();
		this.scrollDistance = 0;
		this.scrollDistanceMax = 1;
		this.scrollSpeed = 0;
		this.SCROLL_POWER = 500;
	}
	update(timeElapsed){
		var unit = 0 - this.scrollSpeed;
		unit /= (0.00000001 + Math.abs(this.scrollSpeed ));
		var slow = 150+this.scrollSpeed*this.scrollSpeed * (0.031);
		this.scrollSpeed +=Math.min(Math.abs(this.scrollSpeed) ,slow* timeElapsed ) * unit ;
		this.scrollDistance += this.scrollSpeed * timeElapsed;
		if(this.scrollDistance >0){
			this.scrollDistance -=this.scrollDistance  * 0.9 *  Math.min(1, timeElapsed*5);
		}
		if(this.scrollDistance < -(this.scrollDistanceMax )){
			this.scrollDistance += -(this.scrollDistanceMax + this.scrollDistance ) * 0.9 *  Math.min(1, timeElapsed*5);
		}
		
	}
	doMouseWheel(power){
		this.scrollSpeed += power * this.SCROLL_POWER;
	}
}