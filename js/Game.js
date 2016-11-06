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
		
		this.renderSearch.e_profileSelected.push( this.h_profileSelected.bind(this));//.h_profileSelected;
		this.renderConversation.e_answerSelected.push( this.h_answerSelected.bind(this));//.h_profileSelected;
		
		this.progress =0;
		this.state = 1;
		this.profileSelected;
	}
	updateProfiles(profiles,timeElapsed){
		for(var i = 1 ; i < profiles.length;i++){
			profiles[i].update(timeElapsed);
		}
		if(this.state == 2){			
			if(this.profileSelected.isNewMessage )this.profileSelected.reset();
		}
	}
	update(timeElapsed){
		this.progress = Math.max(1,this.progress+ timeElapsed);
		this.updateProfiles(this.profiles,timeElapsed);
		switch(this.state){
			case 1:
				//this.screenSearch.update(timeElapsed);
				this.renderSearch.update(timeElapsed); 
				break;
			case 2:
				this.renderConversation.update(timeElapsed);
				break;
		}
	}
	render(canvas, ctx){
		switch(this.state){
			case 1:
				this.renderSearch.render(ctx, canvas.width, canvas.height ,this.profiles);
				break;
			case 2:
				this.renderConversation.render(ctx, canvas.width, canvas.height ,this.profileSelected.conversation,this.progress);
				break;
		}
	}
	doMouseWheel(power){
		switch(this.state){
			case 1:
		this.screenSearch.doMouseWheel(power);
		this.renderSearch.doMouseWheel(power);
				break;
			case 2:
				
		this.renderConversation.doMouseWheel(power);
				break;
		}
		
	}
	doMouseDown(pos){
		switch(this.state){
			case 1:
		this.renderSearch.doMouseDown(pos);//update(timeElapsed);
				break;
			case 2:
		this.renderConversation.doMouseDown(pos);//update(timeElapsed);
				break;
		}
		
		
	}
	h_profileSelected(index){
		if(index==0) return;
		console.log(index);
		
		this.profileSelected = this.profiles[index];
		this.profileSelected.reset();
		this.state = 2;
	}
	h_answerSelected(index){
		var conv = this.profileSelected.conversation;
		conv.setNext(conv.choices[index]);
		this.profileSelected.conversation = conv.choices[index];
		this.renderConversation.reset();
	}
	
}