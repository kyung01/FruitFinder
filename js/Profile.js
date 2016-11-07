"use strict";
class Profile{
	constructor(id , name, conversation, respondingSpeed){
		this.name = name;
		this.id = id;
		this.conversation = conversation;
		this.isNewMessage = 0;
		this.respondingTime = 0;
		this.respondingSpeed = respondingSpeed;
		
	}
	reset(){
		//if(this.isNewMessage) console.log("new meesage flushed");
		var value = this.conversation.readContent(this.isNewMessage);
		this.isNewMessage = 0;
		this.respondingTime = 0;
		return value;
	}
	getName(){
		return this.name;
	}
	getIsOnline(){
		return this.isOnline;
	}
	update(timeElapsed){
		var timeNeeded = 0.0001+ ( this.conversation.content.length) * this.respondingSpeed;
		this.respondingTime =Math.min(this.respondingTime +  timeElapsed , timeNeeded);
		
		this.conversation.progress = this.respondingTime / timeNeeded;
		this.isNewMessage = Math.floor( this.respondingTime / this.respondingSpeed) ; 
	}
	
	static Get_Example(){
		var profiles = new Array();
		profiles.push( new Profile(PROFILE_ID.SELF,"YOU",0,1));
		profiles.push( new Profile(PROFILE_ID.SUGAR,"SugarSweet",Conversation.GET_SUGAR(), 3 ) );
		/*
		profiles.push( new Profile(PROFILE_ID.OLD,"OLD",false));
		profiles.push( new Profile(PROFILE_ID.HOT,"HAUT",false));
		profiles.push( new Profile(PROFILE_ID.INSTAGRAM,"TheFilter",false));
		profiles.push( new Profile(PROFILE_ID.DISCRETE,"Discrete",false));
		profiles.push( new Profile(PROFILE_ID.FETISH,"Root",false));
		profiles.push( new Profile(PROFILE_ID.NASTY,"Nasty",false));
		profiles.push( new Profile(PROFILE_ID.DEFAULT,"this_person",false));
		profiles.push( new Profile(PROFILE_ID.DEFAULT,"not_you",false));
		profiles.push( new Profile(PROFILE_ID.DEFAULT,"NPNC",false));
		profiles.push( new Profile(PROFILE_ID.DEFAULT,"example",false));
		profiles.push( new Profile(PROFILE_ID.DEFAULT,"example",false));
		profiles.push( new Profile(PROFILE_ID.DEFAULT,"example",false));
		profiles.push( new Profile(PROFILE_ID.DEFAULT,"example",false));
		profiles.push( new Profile(PROFILE_ID.DEFAULT,"example",false));
		profiles.push( new Profile(PROFILE_ID.DEFAULT,"example",false));
		profiles.push( new Profile(PROFILE_ID.DEFAULT,"example",false));
		profiles.push( new Profile(PROFILE_ID.DEFAULT,"example",false));
		profiles.push( new Profile(PROFILE_ID.DEFAULT,"example",false));
		profiles.push( new Profile(PROFILE_ID.DEFAULT,"example",false));
		*/
		return profiles;
}
}