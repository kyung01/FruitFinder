"use strict";

//renders the search screen
class RenderSearch extends RenderScrollable{
	
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
		
		this.icon_profiles =[];
		this.e_profileSelected = [];
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
		
		if(profile.isNewMessage){
		
		ctx.shadowBlur=5;
		ctx.shadowColor="black";
		
		ctx.drawImage(IMAGES.get(IMAGE_ID.NEW_MESSAGE),position.x + width *0.7,position.y+height*.710,width * 0.25,width * 0.24);
			

		ctx.shadowBlur=0;
		ctx.fillStyle = "rgba(255,255,255,1)";
		ctx.font=""+height*.20+"px Fjalla One, sans-serif";
		ctx.fillText(profile.isNewMessage,position.x + width *0.773,position.y+height*.9150,width*0.9);
		}
		ctx.restore();
		
	}
	
	update(timeElapsed){
		super.update(timeElapsed);
		
	}
	render(ctx, width, height,profiles){
		this.icon_profiles =[];
		this.scrollDistanceMax = Math.floor( (profiles.length-1)/3) * (width/3);
		
		var size = Math.min(width, height)/3;
		var headerHeight = height / 18;
		ctx.save();
		ctx.strokeStyle = "rgba(0,0,0,1)";
		ctx.fillStyle = "rgba(0,0,0,1)";
		ctx.fillRect(0,0,width,height);
		ctx.translate(0,this.scrollDistance);
		
		
		ctx.strokeStyle = "rgba(0,255,255,1)";
		for(var i = 0; i < profiles.length; i++){
			var x = i % 3 * size;
			var y = Math.floor(i/3) * size;
			if(this.scrollDistance + y+size < 0 || this.scrollDistance + y  > height) 
				continue;
			var position = {x: i % 3 * size, y: Math.floor(i/3) * size};
			this.icon_profiles.push(new BoxClick(position.x,position.y,size,size));
			this.renderProfile(ctx,profiles[i],position,size,size , i == 0);			
		}
		ctx.restore();
	}
	doMouseDown(pos){
		for(var i = 0 ; i < this.icon_profiles.length;i++){
			if(this.icon_profiles[i].isAt(pos.x,pos.y -this.scrollDistance ))
				for(var j =  0; j < this.e_profileSelected.length;j++)
					this.e_profileSelected[j](i);
			
		}
	}
}
