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
		this.inputExit = [];
		
		this.ratioAnimationDir = 1;
		this.ratioAnimation = 0;
		
		this.e_answerSelected = new Array();
		this.e_exit = new Array();
		
		this.isDisplayAnswer = false;
		this.timerDisplayAnswer = 0;
		
		this.maxHeightOld = 0;
	}
	reset(){
		this.isDisplayAnswer = false;
		this.timerDisplayAnswer = 0;
	}
	update(timeElapsed){
		super.update(timeElapsed);
		if(this.isDisplayAnswer) 
			this.timerDisplayAnswer = Math.min(1, this.timerDisplayAnswer + timeElapsed*0.3);
		
		this.ratioAnimation = Math.max(0,Math.min(1, this.ratioAnimation + 2*timeElapsed * this.ratioAnimationDir) , 0);
		if(this.ratioAnimation == 0 || this.ratioAnimation == 1)
			this.ratioAnimationDir *= -1;
		this.colorChoices = [new RGBA(Math.floor( 200 + 50*this.ratioAnimation ),Math.floor(120 + 50*this.ratioAnimation ),Math.floor(50 + 50*this.ratioAnimation ),1), new RGBA(Math.floor(150 + 50*this.ratioAnimation ),Math.floor(100 + 50*this.ratioAnimation ),Math.floor(50*this.ratioAnimation ),1)];
		
	}
	renderBegin(){
		
	}
	renderScriptLine(ctx,width,height, line, type){
		//console.log(line);
		var fontSize = 20;
		var characterMax = 25;
		var spacing = width* 0.025;
		//this.renderLine.render(ctx,width,height,line.content,{x:0,y:0},fontSize,characterMax, this.colorPersonA[0],this.colorPersonA[1]);
		var rectSize = {height:0};
		var x,y,rectSize,color00,color01;
		if(line.type == SCRIPT_LINE_TYPE.TEXT)
			rectSize = this.renderLine.getRectSize(ctx,line.content,fontSize,characterMax);
		else if(line.type == SCRIPT_LINE_TYPE.IMAGE)
			rectSize = this.renderLine.getImageRectSize(fontSize,characterMax);
		
		if(type ==0){
			x=width - rectSize.width -spacing; 
			y= this.offsetY;
			color00= this.colorPersonA[0];
			color01 = this.colorPersonA[1];
		}
		else if( type ==1){
			x=spacing; 
			y= this.offsetY;
			color00= this.colorPersonB[0];
			color01 = this.colorPersonB[1];
		}
		else if(type == 2)
		{
			x = Math.floor((width-rectSize.width)/2 );
			y = this.offsetY;
			color00 = this.colorChoices[0];
			color01 = this.colorChoices[1];
			this.inputIcon.push(new BoxClick(x,y, rectSize.width, rectSize.height));
		}
		
		switch(line.type){
			case SCRIPT_LINE_TYPE.TEXT:
				
				this.renderLine.render(ctx,width,height,line.content,{x:x,y:y},fontSize,characterMax, color00,color01,true);

				break;
			case SCRIPT_LINE_TYPE.IMAGE:
				//console.log(line.content, IMAGES.get(line.content),IMAGES);
				this.renderLine.renderImage(ctx,width,height,fontSize,color00,color01,IMAGES.get(line.content),{x:x,y:y},rectSize.width,rectSize.height,true);
				break;
		}
		this.offsetY += rectSize.height + height * 0.01;
	}
	renderConversation(ctx, width, height, conversation ) {
		
		
		if(conversation.head.type != SCRIPT_LINE_TYPE.EMPTY){
			this.renderScriptLine(ctx,width,height,conversation.head,0);
		}
		for(var i = 0 ; i < conversation.contentUsed.length;i++){
			//console.log(conversation.content);
			this.renderScriptLine(ctx,width,height,conversation.contentUsed[i],1);
		}
		
		if(!conversation.next&& this.timerDisplayAnswer ==1)
			for(var i = 0 ; i < conversation.choices.length;i++){
			this.renderScriptLine(ctx,width,height,conversation.choices[i].head,2);
		}
		if(conversation.next)
			this.renderConversation(ctx,width,height,conversation.next);
	}
	getGradient(ctx,colorA,colorB, posY, height){
		var my_gradient=ctx.createLinearGradient(0,posY,0,height);
		my_gradient.addColorStop(0,colorA.getCode() );
		my_gradient.addColorStop(1,colorB.getCode() );
		return my_gradient;
	}
	renderTop(ctx,width,height,name, barHeight){
		var fontSize = barHeight* 0.5;
		ctx.fillStyle = this.getGradient(ctx,this.colorPersonA[0],this.colorPersonA[1],0,barHeight);
		ctx.fillRect(0,0,width,barHeight);
		ctx.drawImage(IMAGES.get(IMAGE_ID.ICN_BACK), 0,0,barHeight,barHeight);
		ctx.font=fontSize+ "px Roboto, sans-serif";
		ctx.fillStyle ='black';
		ctx.fillText(name,barHeight,+fontSize*1.25);
		
		this.inputExit = [new BoxClick(0,0,barHeight,barHeight)];
	}
	render(ctx, width, height, name, conversation,progress){
		this.inputIcon = [];
		this.menuBarHeight = height*0.08;
		ctx.save();
		height -= this.menuBarHeight;
		ctx.translate(0,this.scrollDistance+this.menuBarHeight);
		var line00 = new RenderLine(ctx,SCRIPT_LINE_TYPE.TEXT ,"How about you send a face pic and I will tell you how hard I will..wqewqeqweqwe.");
		var line01 = new RenderLine(ctx,SCRIPT_LINE_TYPE.TEXT ,"qqqqqq");
		var line02 = new RenderLine(ctx,SCRIPT_LINE_TYPE.TEXT ,"aqweqewqeeqwqewbc");
		this.isDisplayAnswer = conversation.content.length ==0;
		//console.log(this.isDisplayAnswer,this.timerDisplayAnswer);
		line01.pos = {x:200,y:200};
		line02.pos = {x: 250, y:300};
		while(conversation.before)
			conversation = conversation.before;
		this.offsetY = height*0.025;
		this.renderConversation(ctx,width,height,conversation);		
		ctx.restore();
		this.renderTop(ctx,width,height, name,this.menuBarHeight);
		this.scrollDistanceMax = 1 + Math.max(0, this.offsetY-height);
		//line00.render(ctx,width,height,20,25, colorPersonB00,colorPersonB01);
		
		if(this.maxHeightOld != this.offsetY){
			this.maxHeightOld = this.offsetY;
			this.scrollDistance = Math.min( 0, height - this.offsetY);
		}
		
	}
	doMouseDown(pos){
		for(var i= 0; i < this.inputExit.length;i++){
			if(this.inputExit[i].isAt(pos.x, pos.y )){
				//console.log("clicked ",i);
				for(var j = 0 ; j < this.e_exit.length;j++){
					this.e_exit[j]();//.e_answerSelected(i);
				}
			}
		}
		pos.y -= this.menuBarHeight;
		for(var i= 0; i < this.inputIcon.length;i++){
			if(this.inputIcon[i].isAt(pos.x, pos.y - this.scrollDistance)){
				//console.log("clicked ",i);
				for(var j = 0 ; j < this.e_answerSelected.length;j++){
					this.e_answerSelected[j](i);//.e_answerSelected(i);
				}
			}
			//console.log(pos.x, pos.y - this.scrollDistance, this.inputIcon[i]);
		}
		
	}
}
