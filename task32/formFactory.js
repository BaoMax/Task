function FormFactory(){
	this.createItem = function(id,obj){
		// obj.id = id + "_" + obj.id;
		if(obj.type == "button"){
			return createButton(id,obj);
		}else{
			return createInput(id,obj);
		}
	}
	function createInput(id,obj){
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

		var val = new valControl(node);
		val.validator = obj.validator;
		return node;
	}
	function createButton(id,obj){
		var node = document.createElement("input");
		node.type = "submit";
		node.id = id + "_" + obj.id;
		node.innerHTML = obj.name;
		return node;
	}
}