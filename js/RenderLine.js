"use strict";
class RenderLine{
	constructor(type, content){
		this.pos = {x:0,y:0};
		this.type = type;
		this.content = content;
		
	}
	getGradient(ctx,colorA,colorB, posY, height){
		var my_gradient=ctx.createLinearGradient(0,posY,0,height);
		my_gradient.addColorStop(0,colorA.getCode() );
		my_gradient.addColorStop(1,colorB.getCode() );
		return my_gradient;
	}
	getRectSize(content,fontSize, characterMax){
		var fontSpacingX = fontSize*0.50;
		var fontSpacingY = fontSize*1.05;
		var cornerRadius = fontSize *.3;
		var lineCount = Math.ceil(content.length / characterMax);
		var rectWidth, rectHeight;
		
		if(content.length < characterMax){
			rectWidth = fontSpacingX*content.length;
			rectHeight = fontSpacingY;
		}
		else {
			rectWidth = fontSpacingX*characterMax;
			rectHeight = fontSpacingY*lineCount;
		}
		
		rectWidth += fontSize*0.4;
		rectHeight += fontSpacingY * 0.2;
		this.rectSize = {width:rectWidth,height:rectHeight};
		return {width:rectWidth,height:rectHeight};
	}
	renderText(ctx, width, height, 
				content, pos, fontSize,characterMax,
				colorBackgroundA,colorBackgroundB, isOptimized = false){
		
		//var s = "appqwele";
		var fontSpacingX = fontSize*0.50;
		var fontSpacingY = fontSize*1.05;
		var cornerRadius = fontSize *.3;
		var lineCount = Math.ceil(content.length / characterMax);
		var rectWidth;
		var rectHeight;
		if(!isOptimized){
			var rectSize = this.getRectSize(content,fontSize,characterMax);
			rectWidth =rectSize.width;
			rectHeight = rectSize.height;
		}else{
			rectWidth =		this.rectSize.width;
			rectHeight = 	this.rectSize.height;
			
		}
		
		
		ctx.lineWidth = 5;
		ctx.beginPath();
      	ctx.moveTo(pos.x+cornerRadius,pos.y);
		ctx.arcTo(pos.x + rectWidth, pos.y, pos.x + rectWidth, pos.y + cornerRadius, cornerRadius);
		ctx.arcTo(pos.x + rectWidth, pos.y + rectHeight, 
				  pos.x + cornerRadius, pos.y + rectHeight, cornerRadius);
		ctx.arcTo(pos.x , pos.y + rectHeight, 
				  pos.x , pos.y , cornerRadius);
		ctx.arcTo(pos.x , pos.y , 
				  pos.x +rectWidth, pos.y , cornerRadius);
		
		
		//ctx.lineTo(pos.x + cornerRadius, pos.y + rectHeight);
		//ctx.strokeStyle = "rgba(0,0,0,1)"
		//ctx.stroke();
		//ctx.fillStyle = colorBackground.get;
		//ctx.fill();
		//ctx.scale(1,1.02);	
		ctx.fillStyle= this.getGradient(ctx,colorBackgroundA,colorBackgroundB, pos.y,pos.y+rectHeight);
		ctx.fill();
		
		
		
		ctx.font= fontSize + "px Roboto, sans-serif";
		ctx.fillStyle = "rgba(0,0,0,1)";
		for(var i = 0 ; i < lineCount;i++){
			var line = content.slice(i*characterMax, Math.min((i+1)*characterMax ,content.length  ) ) ;
			while(line.length > 0 && line[0] == " ")
				line = line.slice(1,line.length);
			ctx.fillText(line, pos.x+fontSize*0.1,pos.y + fontSize*(i+1), rectWidth);
		}
		
		return {width:rectWidth,height:rectHeight};
		
	}
	
	
	render(ctx,width,height,
			content,pos,
			fontSize,characterMax,
			colorBackgroundA,colorBackgroundB, isOptimized = false){
		var rectSize;
		ctx.save();
		if(this.type == SCRIPT_LINE_TYPE.TEXT){
			rectSize = this.renderText(ctx,width,height, 
							content,pos,
							fontSize, characterMax,colorBackgroundA,colorBackgroundB,isOptimized);
		}
		else {
		}
		ctx.restore();
		return rectSize;
	}
}