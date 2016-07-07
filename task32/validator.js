var validator{
	// body...
	validate : function  (argument) {
		// body...

	}
}
validator.types = {
	isNotEmpty : {
		validate : function(value){
			return value !== "";
		},
		msg:"不可为空"
	},
	isEmpty : {
		validate : function(value){
			return value === "";
		},
		msg:"可为空"
	},
	checkName : {
		validate : function(value){
			var size = str.replace(/[^\x00-\xff]/g,"01").length;
			return (size >=4 && size <= 16)
		},
		msg:"请输入4~16字符"
	},
	checkPassword : {
		validate : function(value,text){
			
		}
	}
}