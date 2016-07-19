function Table(node,obj){
	this.table = node;
	if(obj.data){
		this.initTable(obj.data);
	}
	this.init(obj);
}
Table.prototype.initTable = function(data){
	this.thead = this.table.querySelector("thead tr");
	var head = this.table.querySelector("thead");
	this.table.innerHTML = "";
	this.table.appendChild(head);
	this.jsonToHTML(data);
};
Table.prototype.jsonToHTML = function(data){
	var tbody = document.createElement("tbody");
	this.table.appendChild(tbody);
	data.forEach(function(item){
		var tr = document.createElement("tr");
		for(key in item){
			var td = document.createElement("td");
			td.innerText = item[key];
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	});
};
Table.prototype.HTMLTojson = function(nodes){
	var dataList = [];
	var self = this;
	for(var i = 0; i < nodes.length;i++){
		var tds = nodes[i].querySelectorAll("td");
		var data = {};
		for(var j = 0;j < self.ths.length;j++){
			data[self.ths[j].innerText] = tds[j].innerText;
		}
		dataList.push(data);
	}
	return dataList;
};
Table.prototype.init = function(obj){
	var sortable = obj.sortable;
	this.thead = this.table.querySelector("thead tr");
	this.ths = this.thead.querySelectorAll("th");
	if(sortable){
		var self = this;
		sortable.forEach(function(item,i){

			var up = document.createElement("i");
			up.className = "up";
			up.dataset.type = self.ths[item].innerText;
			up.onclick = function(e){
				var target = e.target;
				self.initTable(self.sort(target.dataset.type));
			}.bind(self);
			self.ths[item].appendChild(up);

			var down = document.createElement("i");
			down.dataset.type = self.ths[item].innerText;
			down.className = "down";
			down.onclick = function(e){
				var target = e.target;
				self.initTable(self.sort(target.dataset.type).reverse());
			}.bind(self);
			
			self.ths[item].appendChild(down);

		});
	}
	if(obj.sort){
		if(obj.sort.colums){
			var self = this;
			obj.sort.colums.forEach(function(item){
				var col = self.ths[item];
				col.querySelector(".up").onclick = function(e){
					var target = e.target;
					self.initTable(obj.sort.handler.call(self,target.dataset.type));
				}.bind(self);

				col.querySelector(".down").onclick = function(e){
					var target = e.target;
					self.initTable(obj.sort.handler.call(self,target.dataset.type).reverse());
				}.bind(self);
			});
		}else{
			this.sort = obj.sort.handler;
		}
	}
};
Table.prototype.sort = function(key){
	var nodes = this.table.querySelectorAll("tbody tr");
	var dataList = this.HTMLTojson(nodes);
	var list = dataList.sort(function(a,b){
		return a[key] - b[key];
	});
	return list;
};
function random(num){
	var a = [];
	var sum = 0;
	for(var i = 0;i < num;i++){
		var score = Math.floor(Math.random()*100)+1;
		sum = sum + score;
		a.push(score);
	}
	a.push(sum);
	return a;
}