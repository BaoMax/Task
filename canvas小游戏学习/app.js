function loadImage(array,callback){
	var imageArr = [],
		count = 0;
	for(var i = 0,l = array.length;i < l; i += 1){
		var img = new Image();
		img.src = array[i];
		imageArr.push(img);
		img.onload = function(){
			count = count + 1;
			if(count == l){
				// callback();
			}
		}
	}
}