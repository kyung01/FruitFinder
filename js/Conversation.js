"use strict";
var SCRIPT_LINE_TYPE = {
	EMPTY :0,
	TEXT :1,
	IMAGE : 2
}

class ScriptLine{
	constructor(type,content){
		this.type = type;
		this.content = content;
	}
}
class Conversation{
	
	constructor(before,next, head, content, choices){
		this.before = before;
		this.next= next;
		this.head = head;
		this.cotent = content;
		this.choices = choices;	
	}
	addChoice(choice){
		choice.before = this;
		this.choices.push(choice);
	}
	static Get_Example(){
		var lineEmpty =  new ScriptLine(SCRIPT_LINE_TYPE.EMPTY,"");
		var conv_empty =			new Conversation(false,false,lineEmpty , [lineEmpty], [] );
		var conv_hi =				new Conversation(false,false,new ScriptLine(SCRIPT_LINE_TYPE.TEXT, "Hi"),[lineEmpty],[])
		var conv_hiBackToYou =	new Conversation(false,false,lineEmpty, [new ScriptLine(1, "HiBackToYou")] , []);

		conv_empty.addChoice(conv_hi);
		conv_hi.addChoice(conv_hiBackToYou);

		return conv_empty;
	}
	
}