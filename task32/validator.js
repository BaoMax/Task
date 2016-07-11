var validator = {
	// body...
	validate : function  (data,type) {
		// body...
		var msg="",result;
		for(var i = 0;i < type.length;i++){
			var item = type[i],fun,compare;
			if(item instanceof Array){
				fun = this.types[item[0]];
				compare = item[1];
			}else{
				fun = this.types[item];
			}
			if(data instanceof Array){
				result = fun.validate(data[0],data[1]);
			}else{
				result = fun.validate(data,null);
			}
			if(!result){
				if(typeof fun.msg == "function"){
					msg = fun.msg(compare);
					return {
						"result":result,
						"msg":msg
					}
				}
				return {
					"result":result,
					"msg":fun.msg
				}
			}
		}
		return {
			"result":true,
			"msg":msg
		};
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
			var size = value.replace(/[^\x00-\xff]/g,"01").length;
			return (size >=4 && size <= 16);
		},
		msg:"请输入4~16字符"
	},
	checkPassword : {
		validate : function(value){
			var size = value.length;
			return (size >=4 && size <= 16);
		},
		msg:"请输入4~16个字符"
	},
	isEqual : {
		validate : function(value,text){
			return value === text;
		},
		msg:function(text){
			return "与" + text + "不相同";
		}
	}
}