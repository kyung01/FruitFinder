"use strict";
class Game extends GameEvents{
	constructor(canvas,ctx){
		super();
		this.profiles = Profile.Get_Example();
		this.conv = Conversation.Get_Example();
		
		this.screenSearch 	= new GameScreenSearch(this.profiles, canvas.width/3);		
		this.screenConv 	= new GameScreenConversation();
		
		this.renderSplash = new RenderSplash();
		this.renderSearch = new RenderSearch();
		this.renderConversation = new RenderConversation();
		this.renderAchievement	=new RenderAchievement();
		this.renderCover	=new RenderCoverScreen();
		this.renderSearch.e_profileSelected.push( this.h_profileSelected.bind(this));//.h_profileSelected;
		this.renderConversation.e_answerSelected.push( this.h_answerSelected.bind(this));//.h_profileSelected;
		
		this.progress =0;
		this.state = 0;
		this.profileSelected;
		
		this.renderSplash.e_finishedLoading.push(this.h_ToSearchScreen.bind(this));
		this.renderConversation.e_exit.push(this.h_ToSearchScreen.bind(this));
		//this.renderAchievement.init("New achivement here");
	}
	h_ToSearchScreen(){
		this.state = 1;
	}
	updateProfiles(profiles,timeElapsed){
		for(var i = 1 ; i < profiles.length;i++){
			profiles[i].update(timeElapsed);
		}
		if(this.state == 2){			
			if(this.profileSelected.isNewMessage ){
				var achivements = this.profileSelected.reset();
				for(var i = 0 ; i < achivements.length;i++){
					if(achivements[i] != "")
						this.renderAchievement.init(achivements[i]);
				}	
			}
		}
	}
	update(timeElapsed){
		this.progress = Math.max(1,this.progress+ timeElapsed);
		switch(this.state){
			case 0:
				this.renderSplash.update(timeElapsed);
				break;
			case 1:
				this.updateProfiles(this.profiles,timeElapsed);
				//this.screenSearch.update(timeElapsed);
				this.renderSearch.update(timeElapsed); 
				break;
			case 2:
				this.updateProfiles(this.profiles,timeElapsed);
				this.renderConversation.update(timeElapsed);
				break;
		}
		this.renderAchievement.update(timeElapsed);
	}
	render(canvas, ctx){
		switch(this.state){
			case 0:
				this.renderSplash.render(ctx,canvas.width, canvas.height );
				break;
			case 1:
				ctx.save();
				ctx.translate(0,this.renderCover.height);
				this.renderSearch.render(ctx, canvas.width, canvas.height-this.renderCover.height ,this.profiles);
				ctx.restore();
				this.renderCover.render(ctx, canvas.width, canvas.height);
				break;
			case 2:
				ctx.save();
				ctx.translate(0,this.renderCover.height);
				this.renderConversation.render(ctx, canvas.width, canvas.height-this.renderCover.height ,
											   this.profileSelected.name, this.profileSelected.conversation,this.progress);
				ctx.restore();
				this.renderCover.render(ctx, canvas.width, canvas.height);
				break;
		}
		this.renderAchievement.render(ctx,canvas.width,canvas.height);
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
		pos.y -= this.renderCover.height;
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