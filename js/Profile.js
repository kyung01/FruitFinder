"use strict";
class Profile{
	constructor(id , name, conversation, respondingSpeed){
		this.name = name;
		this.id = id;
		this.conversation = conversation;
		this.isNewMessage = false;
		this.respondingSpeed = respondingSpeed;
		
	}
	getName(){
		return this.name;
	}
	getIsOnline(){
		return this.isOnline;
	}
	
	static Get_Example(){
		var profiles = new Array();
		profiles.push( new Profile(PROFILE_ID.SELF,"YOU",0,1));
		profiles.push( new Profile(PROFILE_ID.SUGAR,"SugarSweet",Conversation.Get_Example(), 1 ) );
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