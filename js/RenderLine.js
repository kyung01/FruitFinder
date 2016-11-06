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
	
	getImageRectSize(fontSize, characterMax){
		return {width:fontSize*0.450*characterMax, height:fontSize*0.450*characterMax};
	}
	getRectSize(ctx, content,fontSize, characterMax){
		var fontSpacingX = fontSize*0.450;
		var fontSpacingY = fontSize*1.05;
		var cornerRadius = fontSize *.3;
		var lineCount = Math.ceil(content.length / characterMax);
		var rectWidth=1, rectHeight=1;
		
		ctx.font= fontSize + "px Roboto, sans-serif";
		
		
		if(content.length < characterMax){
			rectWidth = Math.max(rectWidth,ctx.measureText(content).width );
			rectHeight = fontSpacingY;
		}
		else {
			for(var i = 0 ; i < lineCount;i++){
				var line = content.slice(i*characterMax, Math.min((i+1)*characterMax ,content.length  ) ) ;
				rectWidth = Math.max(rectWidth,ctx.measureText(line).width );
			}
			rectHeight = fontSpacingY*lineCount;
		}
		
		rectWidth += fontSize*0.45;
		rectHeight += fontSpacingY * 0.2;
		this.rectSize = {width:rectWidth,height:rectHeight};
		return {width:rectWidth,height:rectHeight};
	}
	renderRoundedSquare(ctx, x,y, rectWidth,rectHeight,cornerRadius, colorA, colorB){
		ctx.save();
		ctx.beginPath();
      	ctx.moveTo(x+cornerRadius,y);
		ctx.arcTo(x + rectWidth, y, x + rectWidth, y + cornerRadius, cornerRadius);
		ctx.arcTo(x + rectWidth, y + rectHeight, 
				  x + cornerRadius, y + rectHeight, cornerRadius);
		ctx.arcTo(x , y + rectHeight, 
				  x , y , cornerRadius);
		ctx.arcTo(x , y , 
				  x +rectWidth, y , cornerRadius);
		
			
		ctx.fillStyle= this.getGradient(ctx,colorA,colorB, y,y+rectHeight);
		ctx.fill();
		ctx.restore();
	}
	renderText(ctx, width, height, 
				content, pos, fontSize,characterMax,
				colorBackgroundA,colorBackgroundB, isOptimized = false){
		
		//var s = "appqwele";
		var cornerRadius = fontSize *.3;
		var lineCount = Math.ceil(content.length / characterMax);
		var rectWidth;
		var rectHeight;
		if(!isOptimized){
			var rectSize = this.getRectSize(ctx,content,fontSize,characterMax);
			rectWidth =rectSize.width;
			rectHeight = rectSize.height;
		}else{
			rectWidth =		this.rectSize.width;
			rectHeight = 	this.rectSize.height;
			
		}
		
		this.renderRoundedSquare(ctx, pos.x,pos.y, rectWidth,rectHeight, cornerRadius,colorBackgroundA,colorBackgroundB);
		
		
		
		ctx.font= fontSize + "px Roboto, sans-serif";
		ctx.fillStyle = "rgba(0,0,0,1)";
		for(var i = 0 ; i < lineCount;i++){
			var line = content.slice(i*characterMax, Math.min((i+1)*characterMax ,content.length  ) ) ;
			while(line.length > 0 && line[0] == " ")
				line = line.slice(1,line.length);
			ctx.fillText(line, pos.x+fontSize*0.1,pos.y + fontSize*(i+1));
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
	renderImage(ctx,width,height,fontSize,
				colorBackgroundA,colorBackgroundB,
				content,pos,
				imageWidth,imageHeight){
		ctx.save();
		
		this.renderRoundedSquare(ctx, pos.x,pos.y, imageWidth ,imageHeight, fontSize *.3,colorBackgroundA,colorBackgroundB);
		ctx.drawImage(content,pos.x+imageWidth * 0.05 , pos.y + imageHeight*0.05,imageWidth * 0.9,imageHeight*0.9 );
		ctx.restore();
	}
}