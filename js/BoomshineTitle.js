
"use strict";
class BoomshineTitle{
	constructor(size){
		this.triangles = [];
		this.progress = .10;
		for(var i = 0 ; i < 27;i++){
			this.triangles.push( new PointTriangle());
		}
		
		var fontSize = size *.15
		var posInit = {x:size * .07 , y:size * .28  };
		console.log(size);
		
		for(var i = 0 ; i < 34; i++)for(var j = 0 ; j < this.triangles.length;j++){
			var angle = .5*i + j* .1;
			var radius = 200;
			var x = size*.5 + Math.cos(angle)*radius;
			var y = size*.5 + Math.sin(angle)*radius;
			var triangleSize = size*.1;
			this.triangles[j].addTimeline(
				x+Math.cos(Math.random()*10)*triangleSize,y+Math.sin(Math.random()*10)*triangleSize,
				x+Math.cos(Math.random()*10)*triangleSize,y+Math.sin(Math.random()*10)*triangleSize,
				x+Math.cos(Math.random()*10)*triangleSize,y+Math.sin(Math.random()*10)*triangleSize);
			
		}
		
		this.triangle_B({x:posInit.x,y:posInit.y},fontSize,this.triangles[0],this.triangles[1],this.triangles[2],this.triangles[3]);
		this.triangle_O({x:posInit.x+fontSize*1.2,y:posInit.y},fontSize,this.triangles[4],this.triangles[5],this.triangles[6],this.triangles[7]);
		this.triangle_O({x:posInit.x+fontSize*2.4,y:posInit.y},fontSize,this.triangles[8],this.triangles[9],this.triangles[10],this.triangles[11]);
		this.triangle_M({x:posInit.x+fontSize*3.6,y:posInit.y},fontSize,this.triangles[12],this.triangles[13],this.triangles[14]);
		this.triangle_S({x:posInit.x,y:posInit.y+fontSize*1.2},fontSize,this.triangles[15],this.triangles[16],this.triangles[17]);
		this.triangle_H({x:posInit.x+fontSize*1.2,y:posInit.y+fontSize*1.2},fontSize,this.triangles[18],this.triangles[19],this.triangles[20]);
		this.triangle_I({x:posInit.x+fontSize*2.4,y:posInit.y+fontSize*1.2},fontSize,this.triangles[21]);
		this.triangle_N({x:posInit.x+fontSize*3.6,y:posInit.y+fontSize*1.2},fontSize,this.triangles[22],this.triangles[23]);
		this.triangle_E({x:posInit.x+fontSize*4.8,y:posInit.y+fontSize*1.2},fontSize,this.triangles[24],this.triangles[25],this.triangles[26]);
		
		for(var i = 0 ; i < 10; i++)for(var j = 0 ; j < this.triangles.length;j++){
			var triangle = this.triangles[j];
			this.smoothOut(triangle.point00.x);
			this.smoothOut(triangle.point00.y);
			this.smoothOut(triangle.point01.x);
			this.smoothOut(triangle.point01.y);
			this.smoothOut(triangle.point02.x);
			this.smoothOut(triangle.point02.y);
			
		}
	}
	smoothOut(point){
		var valueEnd = point.timeline[point.timeline.length -1];
		var valueStart = point.timeline[point.timeline.length-2];
		var valueSmoothed = valueStart + (valueEnd- valueStart) * .33;
		point.timeline.splice(point.timeline.length-1,0,valueSmoothed);
	}
	triangle_B(posInit,size,t0, t1, t2,t3){
		var center = [posInit.x+size*.5,posInit.y + size*.5];
		var end00 = [posInit.x + size, posInit.y+ size*.3]
		var end01 = [posInit.x + size, posInit.y+ size*.6]
		//,end01;
		
		t0.addTimeline(posInit.x,posInit.y,
									  posInit.x+size*.5,posInit.y+ size*.5,
									  posInit.x,posInit.y+size);
		
		t1.addTimeline(posInit.x,posInit.y,
									  posInit.x+size,posInit.y,
									  posInit.x+size,posInit.y+size* .3);
		t2.addTimeline(posInit.x+size,posInit.y+size* .3,
									  posInit.x+size*.5,posInit.y+size*.5,
										  posInit.x+size , posInit.y+size*.7);
		t3.addTimeline(posInit.x+size , posInit.y+size*.7,
									  posInit.x+size,posInit.y+size,
									  posInit.x , posInit.y+size);
		
	}
	triangle_O(posInit,size,t0,t1,t2,t3){
		var width = size*.333;
		t0.addTimeline( posInit.x,posInit.y,
						posInit.x,posInit.y + size,
						posInit.x+width,posInit.y + size/2);
		t1.addTimeline( posInit.x+size,posInit.y,
						posInit.x+size,posInit.y+size,
						posInit.x+size-width,posInit.y + size/2);
		t2.addTimeline( posInit.x,posInit.y,
						posInit.x+size,posInit.y,
						posInit.x+(size)/2,posInit.y + width);
		t3.addTimeline( posInit.x,posInit.y+size,
						posInit.x+size,posInit.y+size,
						posInit.x+(size)/2,posInit.y + size-width);
		
	}
	triangle_M(posInit,size,t0,t1,t2){
		var width = size*.333;
		t0.addTimeline( posInit.x,posInit.y,
						posInit.x,posInit.y + size,
						posInit.x+width,posInit.y +size);
		t1.addTimeline( posInit.x+width,posInit.y,
						posInit.x+width,posInit.y + size,
						posInit.x+width+width,posInit.y +size);
		t2.addTimeline( posInit.x+width*2,posInit.y,
						posInit.x+width*2,posInit.y + size,
						posInit.x+width*2+width,posInit.y +size);
		
	}
	triangle_S(posInit,size,t0,t1,t2){
		var width = size*.333;
		t0.addTimeline( posInit.x + size,posInit.y,
						posInit.x + size,posInit.y+width,
						posInit.x ,posInit.y +width);
		t1.addTimeline( posInit.x,posInit.y+width,
						posInit.x,posInit.y + width+width,
						posInit.x+size,posInit.y +width+width);
		t2.addTimeline( posInit.x,posInit.y+size,
						posInit.x+size,posInit.y+size,
						posInit.x+size,posInit.y+size-width);
		
	}
	triangle_H(posInit,size,t0,t1,t2){
		var width = size*.333;
		t0.addTimeline( posInit.x,posInit.y,
						posInit.x,posInit.y + size,
						posInit.x+width,posInit.y +size/2);
		t1.addTimeline( posInit.x+size,posInit.y,
						posInit.x+size,posInit.y + size,
						posInit.x+size-width,posInit.y +size/2);
		t2.addTimeline( posInit.x+width,posInit.y + size/2+width/2,
						posInit.x+size-width,posInit.y + size/2+width/2,
						posInit.x+size/2,posInit.y+size/2 -width+width/2);
		
	}
	triangle_I(posInit,size,t0){
		var width = size*.333;
		t0.addTimeline( posInit.x+width,posInit.y+size,
						posInit.x+size-width,posInit.y+size,
						posInit.x+size/2,posInit.y );
		
	}
	triangle_N(posInit,size,t0,t1){
		var width = size*.8;
		t0.addTimeline( posInit.x,posInit.y,
						posInit.x,posInit.y + size,
						posInit.x+width,posInit.y +size);
		t1.addTimeline( posInit.x+size,posInit.y,
						posInit.x+size-width,posInit.y ,
						posInit.x+size,posInit.y +size);
		
	}
	triangle_E(posInit,size,t0,t1,t2){
		var width = size*.333;
		t0.addTimeline( posInit.x,posInit.y,
						posInit.x+size,posInit.y,
						posInit.x	,posInit.y+width);
		t1.addTimeline( posInit.x,posInit.y+width,
						posInit.x,posInit.y+width*2,
						posInit.x+size,posInit.y +width* 1.5);
		t2.addTimeline( posInit.x,posInit.y+width*2,
						posInit.x,posInit.y+width*3,
						posInit.x+size,posInit.y +size);
		
	}
	
	update(timeElapsed, ratio){
		if(this.progress < .1 && ratio < 0){
			this.progress += -.0009 * timeElapsed;
		}
		else{
			this.progress += ratio * .5 * timeElapsed;
		}
		this.progress =Math.min(1, Math.max(0, this.progress) );
		for(var i = 0 ; i < this.triangles.length;i++){
			this.triangles[i].update(0,this.progress);
		}
	}
	render(ctx){
		ctx.save();
		ctx.strokeStyle = "white";
		ctx.fillStyle = "white";
		ctx.shadowColor = 'white';
		ctx.shadowBlur =20;
		for(var i = 0 ; i < this.triangles.length;i++){
			this.triangles[i].render(ctx);
		}
		ctx.restore();
	}
}