"use strict";
var IMAGES = IMAGES || new Map();
var IMAGE_ID = {NEW_MESSAGE:0,SWEET_NUDE:1};

function loadImages(){


		IMAGES = new Map();
		//SWEET_NUDE
		IMAGES.set(IMAGE_ID.NEW_MESSAGE, document.getElementById("profileNewMessage")  );
		IMAGES.set(IMAGE_ID.SWEET_NUDE, document.getElementById("profileSugarNude")  );
}