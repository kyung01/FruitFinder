"use strict";

//renders the search screen
class RenderConversation{
	
	constructor(){
		
	}
	update(timeElapsed){
		
	}
	render(ctx, width, height, conversation,progress){
		var s = "ss asdmqwl en12ej kqjwe qjwne qjwn eq AKZVX*@$(%*(#^*W$WERKSFM)sdSADV)"
		//var s = "appqwele";
		var characterMax = 10;
		var fontSize = 35;
		var fontSpacingX = fontSize*0.55;
		var fontSpacingY = fontSize*1.05;
		var lineCount = Math.ceil(s.length / characterMax);
		var pos = {x:100, y: 100};
		
		ctx.fillStyle = "rgba(255,0,0,1)";
		if(s.length < characterMax)
			ctx.fillRect(pos.x,pos.y,fontSpacingX*s.length,fontSpacingY);
		else 
			ctx.fillRect(pos.x,pos.y-fontSize,fontSpacingX*characterMax,fontSpacingY*lineCount);
			
		ctx.font= fontSize + "px Fjalla One, sans-serif";
		ctx.fillStyle = "rgba(255,255,255,1)";
		for(var i = 0 ; i < lineCount;i++){
				var line = s.slice(i*characterMax, Math.min((i+1)*characterMax ,s.length  ) ) ;
				ctx.fillText(line, pos.x,pos.y + fontSize*i);
			}
		
		var pos = {x:100, y: 100};
		for(var i = 0 ; i < s.length;i++){
		}
		while(true){
			ctx.fillStyle = "rgba(255,0,0,1)";
			ctx.fillRect(10,0,520,10);
			ctx.fillStyle = "rgba(255,255,255,1)";
			ctx.textAlign="left";
			ctx.font="10px Fjalla One, sans-serif";
			ctx.fillText("hwqewqABDSLKlwe1\n\n\n2!@:!@!@#Lfdsknfdskfsdeewi", 10,10);
			break;
		}
	}
	doMouseWheel(power){
	}
}
