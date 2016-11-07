"use strict";
var IMAGES = IMAGES || new Map();
var IMAGE_ID = {NEW_MESSAGE:0,SWEET_NUDE:1,ME_NUDE:2,
			   ACHV_HAND:3, ACHV_ICON:4,LOGO_SPLASH:5, ICN_CLOCK:6, ICN_BATTERY:7, ICN_WIFI:8,ICN_BACK:9};

function loadImages(){


		IMAGES = new Map();
		//SWEET_NUDE
		IMAGES.set(IMAGE_ID.ACHV_HAND, document.getElementById("achvHand")  );
		IMAGES.set(IMAGE_ID.ACHV_ICON, document.getElementById("achvIcon")  );
		IMAGES.set(IMAGE_ID.NEW_MESSAGE, document.getElementById("profileNewMessage")  );
		IMAGES.set(IMAGE_ID.SWEET_NUDE, document.getElementById("profileSugarNude")  );
		IMAGES.set(IMAGE_ID.ME_NUDE, document.getElementById("profileMeNude")  );
		IMAGES.set(IMAGE_ID.LOGO_SPLASH, document.getElementById("logoSplash")  );
	
		IMAGES.set(IMAGE_ID.ICN_CLOCK, document.getElementById("icnClock")  );
		IMAGES.set(IMAGE_ID.ICN_BATTERY, document.getElementById("icnBattery")  );
		IMAGES.set(IMAGE_ID.ICN_WIFI, document.getElementById("icnWifi")  );
		IMAGES.set(IMAGE_ID.ICN_BACK, document.getElementById("icnBack")  );
}