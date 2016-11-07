
"use strict";
class RenderCoverScreen extends GameEvents{
	constructor(){
		super();
		this.icnClock = IMAGES.get(IMAGE_ID.ICN_CLOCK);
		this.icnWifi = IMAGES.get(IMAGE_ID.ICN_WIFI);
		this.icnBattery = IMAGES.get(IMAGE_ID.ICN_BATTERY);
		this.height = 0;
		
	}
	
	getGradient(ctx,colorA,colorB, posY, height){
		var my_gradient=ctx.createLinearGradient(0,posY,0,height);
		my_gradient.addColorStop(0,colorA.getCode() );
		my_gradient.addColorStop(1,colorB.getCode() );
		return my_gradient;
	}
	
	
	render(ctx,width,height){
		var barHeight  = height*0.05;
		var icnSize = barHeight 
		var g= this.getGradient(ctx,new RGBA(50,50,50,1), new RGBA(10,10,10,1),0,barHeight  );
		this.height = barHeight;
		
		ctx.save();
		ctx.fillStyle = g;
		ctx.fillRect(0,0, width,barHeight);
		ctx.drawImage(this.icnClock,width -icnSize*6,0,icnSize,icnSize);
		ctx.drawImage(this.icnWifi,width -icnSize*5,0,icnSize,icnSize);
		ctx.drawImage(this.icnBattery,width -icnSize*4,0,icnSize,icnSize);
		ctx.font=""+icnSize*0.8	+"px Fjalla One, sans-serif";
		ctx.fillStyle = 'white';
		ctx.fillText("10:12PM",width -icnSize*2.8,icnSize*0.80);
		ctx.restore();
		
	}
}