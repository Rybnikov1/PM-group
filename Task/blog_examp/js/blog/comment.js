var App = App || {};

App.blog = App.blog || {};

App.blog.Comment = function (data, container) {
	this.container = container;
	this.data = data;

	this.createElement();
}

App.blog.Comment.prototype.createElement = function () {
	this.element = document.createElement('div');
	this.element.classList.add("comment");
	this.element.innerHTML = this.data.body;	
	this.container.appendChild(this.element);
}