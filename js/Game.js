"use strict";
class Game{
	constructor(canvas,ctx){
		this.profiles = Profile.Get_Example();
		this.conv = Conversation.Get_Example();
		this.screenSearch = new GameScreenSearch(this.profiles, canvas.width/3);
		
		this.renderSearch = new RenderSearch();
		this.renderConversation = new RenderConversation();
		this.progress =0;
	}
	update(timeElapsed){
		this.progress = Math.max(1,this.progress+ timeElapsed);
		this.screenSearch.update(timeElapsed);
		this.renderSearch.update(timeElapsed);
	}
	render(canvas, ctx){
		//this.renderSearch.render(ctx, canvas.width, canvas.height ,this.profiles);
		this.renderConversation.render(ctx, canvas.width, canvas.height ,this.conv,this.progress);
	}
	doMouseWheel(power){
		this.screenSearch.doMouseWheel(power);
		this.renderSearch.doMouseWheel(power);
	}
	
}