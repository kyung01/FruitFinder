"use strict";
var SCRIPT_LINE_TYPE = {
	EMPTY :0,
	TEXT :1,
	IMAGE : 2
}

class ScriptLine{
	constructor(type,content, achivement = ""){
		this.type = type;
		this.content = content;
		this.achivement = achivement;
	}
}
class Conversation{
	
	constructor(before,next, head, content, choices){
		this.before = before;
		this.next = next;
		this.head = head;
		this.contentUsed = [];
		this.content = content;
		this.choices = choices;
		this.progress =0;
	}
	addChoice(choice){
		choice.before = this;
		this.choices.push(choice);
	}
	setNext(conversation){
		this.next = conversation;
		conversation.before = this;
	}
	readContent(num){
		var achivements = [];
		for(var i = 0 ; i < num;i++){
			achivements.push(this.content[0].achivement);
			this.contentUsed.push( this.content[0]);
			this.content.splice(0,1);
			}
		return achivements;
		
	}
	
	static GET_SUGAR(){
		var lineEmpty =  new ScriptLine(SCRIPT_LINE_TYPE.EMPTY,"");
		var conv_empty =			new Conversation(false,false,lineEmpty , [new ScriptLine(SCRIPT_LINE_TYPE.TEXT, "Hi")], [] );
		var conv_hi =				new Conversation(false,false,new ScriptLine(SCRIPT_LINE_TYPE.TEXT, "Hi"),[
			new ScriptLine(SCRIPT_LINE_TYPE.TEXT, "Your lovely skin looks very delicious. You seem like a beautiful fruit."),
			new ScriptLine(SCRIPT_LINE_TYPE.TEXT, "I just wanted to talk to such a beautiful plant.")
		],[])
		var conv02_thankyou =	new Conversation(false,false,new ScriptLine(SCRIPT_LINE_TYPE.TEXT, "Thank you."), [new ScriptLine(1, "You are welcome :)")] , []);
		var conv02_lmaoThankYou =	new Conversation(false,false,new ScriptLine(SCRIPT_LINE_TYPE.TEXT, "XD. Beautiful? Lol. Thank you though."), [new ScriptLine(1, "Oh why? You don't believe? You are one of the most beautiful fruits I have ever seen.")] , []);
		var conv02_content = [new ScriptLine(1, "^^ I think apples are all born with fair smooth skin. I love apples."),new ScriptLine(1, "BTW what are you looking for?")];
		for(var i = 0 ; i <conv02_content.length; i++ ){
			conv02_thankyou.content.push(conv02_content[i]);
			conv02_lmaoThankYou.content.push(conv02_content[i]);
		}
		
		conv_empty.addChoice(conv_hi);
		conv_hi.addChoice(conv02_thankyou);
		conv_hi.addChoice(conv02_lmaoThankYou);
		
		var conv02_requestAgain =	new Conversation(false,false,new ScriptLine(SCRIPT_LINE_TYPE.TEXT, "What?"), [new ScriptLine(1, "I mean, what are you trying to do by being here? ^^")] , []);
		
		var conv_03WhatAreYouLookingFor =	new Conversation(false,false,new ScriptLine(SCRIPT_LINE_TYPE.TEXT, "What do you mean? do what?"), 
												 [new ScriptLine(1, "I mean..."),new ScriptLine(1, "Why are you here?^^"),new ScriptLine(1, "^^ I am trying to be subtle and non aggressive"),
												 new ScriptLine(1, "^^ Tell me what you are looking for")] , []);
		conv02_thankyou.addChoice(conv02_requestAgain);
		conv02_lmaoThankYou.addChoice(conv02_requestAgain);
		conv02_requestAgain.addChoice(conv_03WhatAreYouLookingFor);
		var conv03_question00 =	new Conversation(false,false,new ScriptLine(SCRIPT_LINE_TYPE.TEXT, "Um... I don't know?"), 
												 [new ScriptLine(1, "You don't know?"),new ScriptLine(1, "Did you just bloom out?"),new ScriptLine(1, "That's ok"),new ScriptLine(1, "In that case..."),new ScriptLine(1, "How aobut I teach you something fun? ^^")], []);
		var conv03_question01 =	new Conversation(false,false,new ScriptLine(SCRIPT_LINE_TYPE.TEXT, "Talking to other fruits?"), 
												 [new ScriptLine(1, "Yes ^^"),new ScriptLine(1, "Me too"),new ScriptLine(1, "But chatting text only can be boring after awhile"),new ScriptLine(1, "Have I have an idea"),new ScriptLine(1, "You are gona like it ^^")] , []);
		var conv03_question02 =	new Conversation(false,false,new ScriptLine(SCRIPT_LINE_TYPE.TEXT, "Nemo"), 
												 [new ScriptLine(1, "Haha That's good one"),new ScriptLine(1, "lol"),new ScriptLine(1, "You are so funny"),new ScriptLine(1, "Hey! I know something more fun")] , []);

		
		var conv04_hot =	new Conversation(false,false,new ScriptLine(SCRIPT_LINE_TYPE.TEXT, "?"), 
												 [new ScriptLine(1, "I will go first ^^"),new ScriptLine(2, IMAGE_ID.SWEET_NUDE),new ScriptLine(1, "Yeah... you like it?"),new ScriptLine(1, "This is a strawberry flower"),new ScriptLine(1, "my flower"),new ScriptLine(1, "A part of my body that is used for reproduction activity"),new ScriptLine(1, "Ok now you send me yours^^"),new ScriptLine(1, "BTW just in case you dont know yet I am 10000 years old"),
												 new ScriptLine(1, "And I live nearby you ^^")], []);
		conv_03WhatAreYouLookingFor.addChoice(conv03_question00);
		conv_03WhatAreYouLookingFor.addChoice(conv03_question01);
		conv_03WhatAreYouLookingFor.addChoice(conv03_question02);
		conv03_question00.addChoice(conv04_hot);
		conv03_question01.addChoice(conv04_hot);
		conv03_question02.addChoice(conv04_hot);
		
		
		var conv05_youAreCreepy =	new Conversation(false,false,new ScriptLine(SCRIPT_LINE_TYPE.TEXT, "You are creepy"), [] , []);
		var conv05_WTF =	new Conversation(false,false,new ScriptLine(SCRIPT_LINE_TYPE.TEXT, "WTF"), [] , []);
		var conv05_Compile =	new Conversation(false,false,new ScriptLine(SCRIPT_LINE_TYPE.IMAGE, IMAGE_ID.ME_NUDE), [new ScriptLine(SCRIPT_LINE_TYPE.TEXT, "Hmmm delicious"),new ScriptLine(SCRIPT_LINE_TYPE.TEXT, "I want to see more of you"),new ScriptLine(SCRIPT_LINE_TYPE.TEXT, "Would you like to come over to my place?"),new ScriptLine(SCRIPT_LINE_TYPE.TEXT, "If you need,"),new ScriptLine(SCRIPT_LINE_TYPE.TEXT, "I could pay you some cash as well ;)","Everyone Has a Price")] , []);
		var conv05NoScript = [new ScriptLine(SCRIPT_LINE_TYPE.TEXT, "Oh..."),new ScriptLine(SCRIPT_LINE_TYPE.TEXT, "Ok"),new ScriptLine(SCRIPT_LINE_TYPE.TEXT, "I am sorry if I made you nervous"),new ScriptLine(SCRIPT_LINE_TYPE.TEXT, "I were trying to be nice"),new ScriptLine(SCRIPT_LINE_TYPE.TEXT, "It is not nice to say such thing to other fruits"),new ScriptLine(SCRIPT_LINE_TYPE.TEXT, "I hope you have a great day with your egocentric self","Cold Hearted")];
		
		for(var i = 0 ; i < conv05NoScript.length;i++){
			conv05_youAreCreepy.content.push(conv05NoScript[i]);
			conv05_WTF.content.push(conv05NoScript[i]);
		}
		conv04_hot.addChoice(conv05_youAreCreepy);
		conv04_hot.addChoice(conv05_WTF);
		conv04_hot.addChoice(conv05_Compile);
		//new ScriptLine(SCRIPT_LINE_TYPE.IMAGE, IMAGE_ID.ME_NUDE)
		//conv_hi.addChoice(conv_hiBackToYouC);
		//conv_hiBackToYouA.addChoice(conv_hiBackToYouB);
		//conv_hiBackToYouA.addChoice(conv_hiBackToYouC);

		return conv_empty;
	}
	
	static Get_Example(){
		var lineEmpty =  new ScriptLine(SCRIPT_LINE_TYPE.EMPTY,"");
		var conv_empty =			new Conversation(false,false,lineEmpty , [new ScriptLine(SCRIPT_LINE_TYPE.TEXT,"0 TEXT"),
																			  new ScriptLine(SCRIPT_LINE_TYPE.IMAGE,"1 Image"),
																			 new ScriptLine(SCRIPT_LINE_TYPE.TEXT,"2 TEXT")], [] );
		var conv_hi =				new Conversation(false,false,new ScriptLine(SCRIPT_LINE_TYPE.TEXT, "Hi"),[],[])
		var conv_hiBackToYouA =	new Conversation(false,false,new ScriptLine(SCRIPT_LINE_TYPE.TEXT, "say A"), [new ScriptLine(1, "HiBackToasdsdasdYou")] , []);
		var conv_hiBackToYouB =	new Conversation(false,false,new ScriptLine(SCRIPT_LINE_TYPE.TEXT, "say B"), [new ScriptLine(1, "HiBackTosdsdasadou")] , []);
		var conv_hiBackToYouC =	new Conversation(false,false,new ScriptLine(SCRIPT_LINE_TYPE.TEXT, "say C"), [new ScriptLine(1, "HiBackTosdasdsadou")] , []);

		conv_empty.addChoice(conv_hi);
		conv_hi.addChoice(conv_hiBackToYouA);
		conv_hi.addChoice(conv_hiBackToYouB);
		conv_hi.addChoice(conv_hiBackToYouC);
		conv_hiBackToYouA.addChoice(conv_hiBackToYouB);
		conv_hiBackToYouA.addChoice(conv_hiBackToYouC);

		return conv_empty;
	}
	
}