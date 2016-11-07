"use strict";
var IMAGES = IMAGES || new Map();
var IMAGE_ID = {NEW_MESSAGE:0,SWEET_NUDE:1,ME_NUDE:2,
			   ACHV_HAND:3, ACHV_ICON:4};

function loadImages(){


		IMAGES = new Map();
		//SWEET_NUDE
		IMAGES.set(IMAGE_ID.ACHV_HAND, document.getElementById("achvHand")  );
		IMAGES.set(IMAGE_ID.ACHV_ICON, document.getElementById("achvIcon")  );
		IMAGES.set(IMAGE_ID.NEW_MESSAGE, document.getElementById("profileNewMessage")  );
		IMAGES.set(IMAGE_ID.SWEET_NUDE, document.getElementById("profileSugarNude")  );
		IMAGES.set(IMAGE_ID.ME_NUDE, document.getElementById("profileMeNude")  );
}