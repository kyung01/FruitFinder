"use strict";
class Game extends GameEvents{
	constructor(canvas,ctx){
		super();
		this.profiles = Profile.Get_Example();
		this.conv = Conversation.Get_Example();
		
		this.screenSearch 	= new GameScreenSearch(this.profiles, canvas.width/3);		
		this.screenConv 	= new GameScreenConversation();
		
		this.renderSearch = new RenderSearch();
		this.renderConversation = new RenderConversation();
		
		this.renderConversation.link(this.screenConv);
		this.progress =0;
	}
	updateProfiles(profiles,timeElapsed){
		
	}
	update(timeElapsed){
		this.updateProfiles(this.profiles,timeElapsed);
		this.progress = Math.max(1,this.progress+ timeElapsed);
		this.screenSearch.update(timeElapsed);
		this.renderSearch.update(timeElapsed);
		this.renderConversation.update(timeElapsed);
	}
	render(canvas, ctx){
		//this.renderSearch.render(ctx, canvas.width, canvas.height ,this.profiles);
		this.renderConversation.render(ctx, canvas.width, canvas.height ,this.conv,this.progress);
	}
	doMouseWheel(power){
		this.screenSearch.doMouseWheel(power);
		this.renderSearch.doMouseWheel(power);
		this.renderConversation.doMouseWheel(power);
	}
	doMouseDown(pos){
		//this.renderSearch.doMouseDown(pos);//update(timeElapsed);
		this.renderConversation.doMouseDown(pos);//update(timeElapsed);
		
	}
	
}