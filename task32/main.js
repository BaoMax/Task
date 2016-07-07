function createForm(id,array){
	var form = document.createElement("form");
	form.id = id;
	var formFactory = new FormFactory;
	for(var i = 0;i < array.length;i++){
		var item = formFactory.createItem(array[i]);
		form.appendChild(item);
	}
	return form;
}
var array1 = [
	{"id":"name","label":"名称","type":"input","validator":["isNoEmpty","checkName"],"rules":"必填,请输入4~16个字符","success":"名称格式正确","fail":"名称格式不正确"},
	{"id":"password","label":"密码","type":"password","validator":["isNoEmpty","checkPassword"],"rules":"必填,请输入4~16个字符","success":"密码格式正确","fail":"密码格式不正确"},
	{"id":"confirm","label":"确认密码","type":"password","validator":["isNoEmpty","checkPassword","isEqual"],"rules":"必填,请输入4~16个字符","":"","success":"两次密码输入一致","fail":"密码格式不正确"},
	{"id":"submit","name":"提交","type":"button","validator":"","success":"验证通过","fail":"验证不通过"}
];
var array2 = [{"label":"名称","type":"input","validator":["isNoEmpty","checkName"],"rules":"必填,请输入4~16个字符","success":"名称格式正确","fail":"名称格式不正确"},{"name":"提交","type":"button","validator":"","success":"验证通过","fail":"验证不通过"}];
document.body.appendChild(createForm("from1",array1));
document.body.appendChild(createForm("from2",array2));