"use strict";
//used as a simple wraper for testing screen click event
class RenderAchievement extends GameEvents{
	constructor(){
		super();
		this.state = 0;
		this.imgHand = IMAGES.get(IMAGE_ID.ACHV_HAND);
		this.imgIcon = IMAGES.get(IMAGE_ID.ACHV_ICON);
		this.header = "ACHIEVEMENT UNLCOKED";
		this.title = "TITLE_HERE";
		this.progress = 0;
		this.progressDelay = 0;
		this.progressArm= 0;
	}
	reset(){
		this.progressArm= 0;
		this.progress = 0;
		this.progressDelay =0;
	}
	init(title){
		this.reset();
		this.state = 1;
		this.title = title;
	}
	renderAchivement(ctx,width,height){
	}
	update(timeElapsed){
		super.update(timeElapsed);
		if(this.state ==0) return;
		this.progressArm +=timeElapsed;
		if(this.state==1){
			this.progress = Math.min(this.progress + timeElapsed*0.5, 1);
			if(this.progress >= 1){
				this.state = 2;
			}
		}
		if(this.state ==2){
			this.progressDelay =  Math.min(this.progressDelay + timeElapsed*0.15, 1);
			if(this.progressDelay >= 1){
				this.state = 3;
			}
		}
		if(this.state == 3){
			this.progress = Math.max(this.progress - timeElapsed*0.8, 0);
			if(this.progress <= 0){
				this.state = 0;
				this.reset();
			}
			
		}
	}
	
	getGradient(ctx,colorA,colorB, posY, height){
		var my_gradient=ctx.createLinearGradient(0,posY,0,height);
		my_gradient.addColorStop(0,colorA.getCode() );
		my_gradient.addColorStop(1,colorB.getCode() );
		return my_gradient;
	}
	
	renderRoundedSquare(ctx, x,y, rectWidth,rectHeight,cornerRadius, colorA, colorB){
		ctx.save();
		ctx.beginPath();
      	ctx.moveTo(x+cornerRadius,y);
		ctx.arcTo(x + rectWidth, y, x + rectWidth, y + cornerRadius, cornerRadius);
		ctx.arcTo(x + rectWidth, y + rectHeight, 
				  x + cornerRadius, y + rectHeight, cornerRadius);
		ctx.arcTo(x , y + rectHeight, 
				  x , y , cornerRadius);
		ctx.arcTo(x , y , 
				  x +rectWidth, y , cornerRadius);
		
			
		ctx.fillStyle= this.getGradient(ctx,colorA,colorB, y,y+rectHeight);
		ctx.fill();
		ctx.restore();
	}
	rednerArm(ctx,width,height){
		var x= 0, y = height * 0.7;
		var imageSize = width* 0.8; 
		ctx.save();
		ctx.translate(-imageSize*1.2 + imageSize *this.progress, 0);
		ctx.rotate( Math.cos(this.progress*this.progress *5)  * 3.14*0.09 * (1- (this.progress *this.progress ) )
				   + Math.cos(this.progressArm) *( 3.14*0.02 )*( this.progress* this.progress* this.progress* this.progress)
				  );
		ctx.drawImage(this.imgHand ,x,y-imageSize, imageSize,imageSize);
		ctx.restore();
	}
	render(ctx, width, height){
		this.rednerArm(ctx,width,height);
		ctx.save();
		
		var fontSize = width * 0.05;
		var imageSize = height* 0.15; 
		var x= 0, y = height-imageSize*1.3;
		ctx.font= "bold " + fontSize + "px Roboto, sans-serif, bold";
		var titleWidth = Math.max(ctx.measureText(this.header).width , ctx.measureText(this.title).width) + fontSize;
		x = (width -(titleWidth+imageSize) ) /2;
		
			
		if(this.state == 1 || this.state == 2 ||this.state == 3){

			this.renderRoundedSquare(ctx,x,y, imageSize+titleWidth*this.progress*this.progress,imageSize,imageSize*0.4,new RGBA(255,200,100,1),new RGBA(150,80,30,1) );
			ctx.drawImage(this.imgIcon ,x+imageSize*0.05,y+imageSize*0.05, imageSize*0.9,imageSize*0.9);
			ctx.fillStyle= "rgba(255,255,255,1)"
		}
		if(this.state == 2){
			ctx.font= "bold " + fontSize + "px Roboto, sans-serif, bold";
			ctx.fillText(this.header,x+imageSize+fontSize*0.5,y + imageSize*0.5-fontSize*.25);
			ctx.font= + fontSize + "px Roboto, sans-serif, bold";
			ctx.fillText(this.title ,x+imageSize+fontSize*0.5,y + imageSize*0.5+fontSize*.8);
		}
		ctx.restore();
		
	}
	
}