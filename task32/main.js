function createForm(id,array){
	var form = document.createElement("form");
	form.id = id;
	document.body.appendChild(form);
	var formFactory = new FormFactory(id);
	var inputs = [];
	var button;
	for(var i = 0;i < array.length;i++){
		var item = formFactory.createItem(id,array[i]);
		if(item.type != "submit"){
			inputs.push(item);
		}else{
			button = item;
		}
	}
	form.onsubmit = function(e){
		e.preventDefault();
		e.stopPropagation();
		var result = true;
		for(var i = 0;i < inputs.length;i++){
			var temp = inputs[i].input;
			inputs[i].input.focus();
			inputs[i].input.blur();
			if(result){
				result = result && inputs[i].check().result;
			}
		}
		if(result){
			alert(button.dataset.success);
		}else{
			alert(button.dataset.fail);
		}
	}
	return form;
}
var array1 = [
	{"id":"name","label":"名称","type":"input","validator":["isNotEmpty","checkName"],"rules":"必填,请输入4~16个字符","success":"名称格式正确","fail":"名称格式不正确"},
	{"id":"password","label":"密码","type":"password","validator":["isNotEmpty","checkPassword"],"rules":"必填,请输入4~16个字符","success":"密码格式正确","fail":"密码格式不正确"},
	{"id":"confirm","label":"确认密码","type":"password","compare":"password","validator":["isNotEmpty","checkPassword",["isEqual","密码"]],"rules":"必填,请输入4~16个字符","":"","success":"两次密码输入一致","fail":"密码格式不正确"},
	{"id":"submit","name":"提交","type":"button","validator":"","success":"验证通过","fail":"验证不通过"}
];
var array2 = [{"label":"名称","type":"input","validator":["isNotEmpty","checkName"],"rules":"必填,请输入4~16个字符","success":"名称格式正确","fail":"名称格式不正确"},{"name":"提交","type":"button","validator":"","success":"验证通过","fail":"验证不通过"}];
createForm("from1",array1);
createForm("from2",array2);