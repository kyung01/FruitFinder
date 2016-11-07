"use strict";

//renders the search screen
class RenderSplash extends GameEvents{
	
	constructor(){
		super();
		this.imgSplash = IMAGES.get(IMAGE_ID.LOGO_SPLASH);
		this.progress = 0;
		this.e_finishedLoading = []
	}
	update(timeElapsed){
		super.update(timeElapsed);
		this.progress = Math.min(this.progress + timeElapsed*0.15, 1);
		if(this.progress >= 1){
			for(var i = 0 ; i < this.e_finishedLoading.length;i++){
				this.e_finishedLoading[i]();
			}
		}
	}
	render(ctx, width, height){
		var imageSize = width * 0.6;
		ctx.save();
		ctx.fillStyle = "rgba(230,130,70,1)";
		ctx.fillRect(0,0,width,height);
		
		
		ctx.shadowBlur=0;
		ctx.shadowColor="white";
		ctx.fillStyle = "white";
		ctx.beginPath();
		ctx.moveTo(width/2,height/2);
		ctx.arc(width/2,height/2,width*0.75,0,2*Math.PI * this.progress);
		ctx.fill();
		
		ctx.shadowBlur=0;
		ctx.fillStyle = "rgba(230,130,70,1)";
		ctx.beginPath();
		ctx.moveTo(width/2,height/2);
		ctx.arc(width/2,height/2,width*0.70,0,2*Math.PI * (this.progress*1.02));
		ctx.fill();
		
		ctx.shadowColor="black";
		ctx.shadowBlur= 5;
		ctx.drawImage(this.imgSplash , ( width - imageSize ) /2 ,height * 0.5 - imageSize*0.5,imageSize,imageSize);
		ctx.restore();
	}
}
