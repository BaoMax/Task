function FormFactory(){
	this.createItem = function(obj){
		if(obj.type == "button"){
			return createButton(obj);
		}else{
			return createInput(obj);
		}
	}
	function createInput(obj){
		var node = document.createElement("section");
		node.className = "input_group";
		var label = document.createElement("label");
		label.innerHTML = obj.label;
		node.appendChild(label);
		var input = document.createElement("input");
		input.type = obj.type;
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
	function createButton(obj){
		var node = document.createElement("input");
		node.type = "submit";
		node.innerHTML = obj.name;
		return node;
	}
}