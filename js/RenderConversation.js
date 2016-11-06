"use strict";

//renders the search screen
class RenderConversation extends RenderScrollable{
	
	constructor(){
		super();
		this.colorPersonA = [new RGBA(255,170,100,1), new RGBA(205,160,50,1)];
		this.colorPersonB = [new RGBA(168,236,255,1), new RGBA(70,200,255,1)];
		this.colorChoices = [new RGBA(255,200,200,1), new RGBA(200,100,100,1)];
		this.renderLine = new RenderLine(SCRIPT_LINE_TYPE.TEXT ,"undefeind");
		this.inputIcon = [];
		
		this.ratioAnimationDir = 1;
		this.ratioAnimation = 0;
		this.e_answerSelected = [];
	}
	link(item){
		this.e_answerSelected.push(item);
	}
	update(timeElapsed){
		super.update(timeElapsed);
		this.ratioAnimation = Math.max(0,Math.min(1, this.ratioAnimation + 2*timeElapsed * this.ratioAnimationDir) , 0);
		if(this.ratioAnimation == 0 || this.ratioAnimation == 1)
			this.ratioAnimationDir *= -1;
		this.colorChoices = [new RGBA(Math.floor( 200 + 50*this.ratioAnimation ),Math.floor(120 + 50*this.ratioAnimation ),Math.floor(50 + 50*this.ratioAnimation ),1), new RGBA(Math.floor(150 + 50*this.ratioAnimation ),Math.floor(100 + 50*this.ratioAnimation ),Math.floor(50*this.ratioAnimation ),1)];
		
	}
	renderBegin(){
		this.offsetY = 0;
		
	}
	renderScriptLine(ctx,width,height, line, type){
		//console.log(line);
		var fontSize = 20;
		var characterMax = 25;
		//this.renderLine.render(ctx,width,height,line.content,{x:0,y:0},fontSize,characterMax, this.colorPersonA[0],this.colorPersonA[1]);
		var rectSize = {height:0};
		
		switch(type){
			default:
				//sent my me
				//rectSize = this.renderLine.render(ctx,width,height,line.content,0,0, fontSize,characterMax, this.colorPersonA[0],this.colorPersonA[1]);
				//console.log(line.content , this.offsetY, rectSize);
				break;
				//me
			case 1:
				//sent by other person
				if(line.type == SCRIPT_LINE_TYPE.TEXT){
					rectSize = this.renderLine.getRectSize(line.content,fontSize,characterMax);
					this.renderLine.render(ctx,width,height,line.content,{x:0,y:this.offsetY},fontSize,characterMax, this.colorPersonB[0],this.colorPersonB[1],true);
				}
				else{
				}
				//rectSize = this.renderLine.render(ctx,width,height,line.content,{x:0,y:this.offsetY},fontSize,characterMax, this.colorPersonA[0],this.colorPersonA[1]);
				//console.log(line.content , this.offsetY, rectSize);
				break;
			case 2:		
				var x=0,y=0;
				//list of choices
				if(line.type == SCRIPT_LINE_TYPE.TEXT){
					rectSize = this.renderLine.getRectSize(line.content,fontSize,characterMax);
					x = (width-rectSize.width)/2;
					y = this.offsetY;
					this.renderLine.render(ctx,width,height,line.content,{x:x,y:y},fontSize,characterMax, this.colorChoices[0],this.colorChoices[1],true);
				}
				this.inputIcon.push(new BoxClick(x,y, rectSize.width, rectSize.height));
				break;
		}
		this.offsetY += rectSize.height + height * 0.01;
	}
	render(ctx, width, height, conversation,progress){
		this.inputIcon = [];
		ctx.save();
		ctx.translate(0,this.scrollDistance);
		var line00 = new RenderLine(ctx,SCRIPT_LINE_TYPE.TEXT ,"How about you send a face pic and I will tell you how hard I will..wqewqeqweqwe.");
		var line01 = new RenderLine(ctx,SCRIPT_LINE_TYPE.TEXT ,"qqqqqq");
		var line02 = new RenderLine(ctx,SCRIPT_LINE_TYPE.TEXT ,"aqweqewqeeqwqewbc");
		line01.pos = {x:200,y:200};
		line02.pos = {x: 250, y:300};
		//line00.render(ctx,width,height,20,25, colorPersonB00,colorPersonB01);
		
		this.renderBegin();
		
		if(conversation.head.type != SCRIPT_LINE_TYPE.EMPTY){
			this.renderScriptLine(ctx,width,height,conversation.head,0);
		}
		for(var i = 0 ; i < conversation.content.length;i++){
			//console.log(conversation.content);
			this.renderScriptLine(ctx,width,height,conversation.content[i],1);
		}
		
		for(var i = 0 ; i < conversation.choices.length;i++){
			this.renderScriptLine(ctx,width,height,conversation.choices[i].head,2);
		}
		ctx.restore();
		this.scrollDistanceMax = 1 + this.offsetY;
	}
	doMouseDown(pos){
		for(var i= 0; i < this.inputIcon.length;i++){
			if(this.inputIcon[i].isAt(pos.x, pos.y - this.scrollDistance)){
				//console.log("clicked ",i);
				for(var j = 0 ; j < e_answerSelected.length;j++){
					e_answerSelected[j].e_answerSelected(i);
				}
			}
			//console.log(pos.x, pos.y - this.scrollDistance, this.inputIcon[i]);
		}
		
	}
}
