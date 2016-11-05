"use strict";

//renders the search screen
class RenderSearch extends GameEvents{
	
	constructor(){
		super();
		this.imagesProfile = new Map();
		this.imageOutline = document.getElementById("profileOutline");
		this.imageOutlineUnLit = document.getElementById("profileOutlineUnLit");
		this.imageOutlineLit = document.getElementById("profileOutlineLit00");
		this.imageOutlineLitMe = document.getElementById("profileOutlineLit01");
		
		this.imagesProfile.set(PROFILE_ID.SELF, document.getElementById("profileSelf")  );
		this.imagesProfile.set(PROFILE_ID.DEFAULT, document.getElementById("profileDefault")  );
		this.imagesProfile.set(PROFILE_ID.HOT, document.getElementById("profileHot") );
		this.imagesProfile.set(PROFILE_ID.INSTAGRAM, document.getElementById("profileInstagram") );
		this.imagesProfile.set(PROFILE_ID.NASTY, document.getElementById("profileNasty") );
		this.imagesProfile.set(PROFILE_ID.SUGAR, document.getElementById("profileSugar") );
		this.imagesProfile.set(PROFILE_ID.FETISH, document.getElementById("profileFetish") );
		this.imagesProfile.set(PROFILE_ID.OLD, document.getElementById("profileOld") );
		this.imagesProfile.set(PROFILE_ID.DISCRETE, document.getElementById("profileDiscrete") );
		this.scrollDistance = 0;
		this.scrollDistanceMax = 1;
		this.scrollSpeed = 0;
		this.SCROLL_POWER = 500;
		
		
		this.scrollSpeed = 0;
		this.SCROLL_POWER = 500;
		this.scrollDistance = 0;
		this.scrollDistanceMax = 1;
		
	}
	renderProfile(ctx, profile, position, width, height,isSelf){
		ctx.save();
		ctx.fillStyle = "rgba(255,255,255,1)";
		ctx.font=""+height*.25+"px Fjalla One, sans-serif";
		ctx.textAlign="left";
		
		ctx.drawImage(this.imagesProfile.get(profile.id),position.x,position.y,width,height);
		//console.log(this.imageOutlineSelected);
		//ctx.beginPath();
		//ctx.rect(position.x,position.y,width,height);
		
		ctx.shadowBlur=10;
		ctx.shadowColor="black";
		
		ctx.fillText(profile.name,position.x + width *0.05,position.y+height*.250,width*0.9);
		ctx.shadowBlur=0;
		
		if(isSelf)
			ctx.drawImage(this.imageOutlineLitMe,position.x,position.y,width,height);
		else if(profile.isNewMessage)
			ctx.drawImage(this.imageOutlineLit,position.x,position.y,width,height);
		else
			ctx.drawImage(this.imageOutlineUnLit,position.x,position.y,width,height);
		
		ctx.drawImage(this.imageOutline,position.x,position.y,width,height);
		
		ctx.restore();
		
	}
	
	update(timeElapsed){
		timeElapsed = Math.min(timeElapsed, 1/10);
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
	render(ctx, width, height,profiles){
		this.scrollDistanceMax = Math.floor( (profiles.length-1)/3) * (width/3);
		
		var size = Math.min(width, height)/3;
		var headerHeight = height / 18;
		this.scrollDistanceMax = Math.floor( (profiles.length-1)/3) * (width/3);
		ctx.save();
		ctx.translate(0,this.scrollDistance);
		ctx.strokeStyle = "rgba(255,255,255,1)";
		ctx.fillStyle = "rgba(255,255,255,1)";
		ctx.fillRect(0,0,width,height);
		
		
		ctx.strokeStyle = "rgba(0,255,255,1)";
		for(var i = 0; i < profiles.length; i++){
			var x = i % 3 * size;
			var y = Math.floor(i/3) * size;
			if(this.scrollDistance + y+size < 0 || this.scrollDistance + y  > height) 
				continue;
			var position = {x: i % 3 * size, y: Math.floor(i/3) * size};
			this.renderProfile(ctx,profiles[i],position,size,size , i == 0);
			
		}
		ctx.restore();
	}
	doMouseWheel(power){
		this.scrollSpeed += power * this.SCROLL_POWER;
	}
}
