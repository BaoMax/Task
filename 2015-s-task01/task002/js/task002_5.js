function drag(e){
	e.dataTransfer.setData("text",e.target.id);
}
function dragover(e){
	e.preventDefault();
}
function drop(e){
	var data = e.dataTransfer.getData("text"),
		target = e.target;
	e.target.appendChild(document.getElementById(data));
}