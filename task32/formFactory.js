function FormFactory(id){
	this.wapper = document.getElementById(id);
	this.createItem = function(id,obj){
		// obj.id = id + "_" + obj.id;
		if(obj.type == "button"){
			return this.createButton(id,obj);
		}else{
			return this.createInput(id,obj);
		}
	}
	this.createInput = function (id,obj){
		var node = document.createElement("section");
		node.className = "input_group";
		var label = document.createElement("label");
		label.innerHTML = obj.label;
		node.appendChild(label);
		var input = document.createElement("input");
		input.type = obj.type;
		input.id = id + "_" + obj.id;
		if(obj.compare){
			input.dataset.compare = id + "_" +obj.compare;
		}
		input.dataset.rules = obj.rules;
		input.dataset.success = obj.success;
		input.dataset.fail = obj.fail;
		node.appendChild(input);

		var tip = document.createElement("section");
		tip.className = "tip";
		node.appendChild(tip);

		this.wapper.appendChild(node);

		var val = new valControl(node);
		val.validator = obj.validator;
		return val;
	}
	this.createButton = function(id,obj){
		var node = document.createElement("input");
		node.type = "submit";
		node.id = id + "_" + obj.id;
		node.innerHTML = obj.name;
		
		node.dataset.success = obj.success;
		node.dataset.fail = obj.fail;

		this.wapper.appendChild(node);
		return node;
	}
}