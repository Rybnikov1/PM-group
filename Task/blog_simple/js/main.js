(function () {
	var container = document.getElementById('container');
	var posts = [];
	var comments = [];
	var postDataNew;
	var commentsDataNew;

	var sortButton = document.getElementById('buttonSort');

	getAllPostsAndComments();

	sortButton.addEventListener("click", function (){
		postDataNew.sort(function (a,b){
			return a - b;
		});
		posts = [];
		container.innerHTML = '';
		renderAllPosts(postDataNew, commentsDataNew);
	});

	function getAllPostsAndComments () {
		xhrUtils.getAll("posts", function (postData) {				
			xhrUtils.getAll('comments', function (commentData){
				postDataNew = postData;
				commentsDataNew = commentData;
				renderAllPosts(postData, commentData);
			}, xhrUtils.failedRequest);		
		}, xhrUtils.failedRequest);
	}

	function renderAllPosts (postData, commentData) {
		for (var i in postData) {
			createPost(postData[i], commentData.filter(function (comment) {
				return comment.postId === postData[i].id;
			}));
		}

		createPostBlock(function () {
			xhrUtils.getAll("posts", getAllPostsAndRener, xhrUtils.failedRequest);
		});
	}

	function createPostBlock () {
		var head = document.getElementById("newpost_postname");
		var body = document.getElementById("newpost_postbody");
		var create = document.getElementById("create");

		create.addEventListener("click", function () {
			xhrUtils.create({body: body.value, postname: head.value }, "posts", function (data) {
				createPost(data);
			});			
		});
	}	

	function createPost (data, comments) {
		var post = newPost(data, comments);
		var self = this;

		posts.push(post);
		container.appendChild(post);
	}	

	function newPost (content, comments) {
		var head, body, element, id, commentBlock;

		element = document.createElement('div');

		id = content.id;

		createHeader();

		createBody();

		initListeners();

		renderContent();

		addComments();

		newComentBlock();

		function createBody () {	
			body = document.createElement('div');
			body.classList.add("post_body");	
			body.classList.add("post_body--normal");	
			body.setAttribute("contenteditable", "");
			element.appendChild(body);
		}

		function createHeader () {		
			var self = this;
			header = document.createElement('div');
			header.classList.add("post_header");
			header.content = document.createElement('span');
			header.del = document.createElement('button');
			header.del.innerHTML = "Delete"; 
			header.del.classList.add('delete');
			header.appendChild(header.content);		
			header.appendChild(header.del);
			element.appendChild(header);		
		}

		function initListeners () {
			body.addEventListener("focus", function (e) {
				this.classList.remove("post_body--normal")
				this.classList.add("post_body--focus");
			});

			body.addEventListener("blur", function (e) {
				this.classList.add("post_body--normal")
				this.classList.remove("post_body--focus");
				sendChanges();
			});		

			header.del.addEventListener("click", function (e) {
				xhrUtils.deleteRecord(id, "posts", function () {
					destroy();
				}, xhrUtils.failedRequest);
			});
		}

		function renderContent () {
			body.innerHTML = content.body;
			header.content.innerHTML = content.postname;
		}

		function sendChanges () {		
			content.body = body.innerHTML;
			xhrUtils.update(content, id, 'posts');
		}

		function destroy () {
			element.remove();
		}

		function addComments () {
			var commentTitle = document.createElement('h3');
			commentTitle.innerHTML = "Comments: ";
			commentBlock = document.createElement('div');	
			commentBlock.appendChild(commentTitle);
			element.appendChild(commentBlock);
			if (comments) {		
				comments.forEach(function(comment) {
					comment.el = createComment(commentBlock, comment);//?
				});
			}
		}

		function createComment (container, data) {
			var element	= document.createElement('div');
			element.classList.add("comment");
			element.innerHTML = data.body;	//?
			container.appendChild(element);
		}

		function newComentBlock () {
			var input = document.createElement('input');
			var create = document.createElement('button');
			var wrap = document.createElement('div');				
			var title = document.createElement('span');
			input.type = "text";
			create.innerHTML = "Send";	
			title.innerHTML = "New Comment:";	
			wrap.classList.add("newcomment");				
			wrap.appendChild(title);
			wrap.appendChild(input);
			wrap.appendChild(create);
			element.appendChild(wrap);

			create.addEventListener('click', function () {
				xhrUtils.create({postId: id, body: input.value}, "comments", function (data) {		
					createComment(commentBlock, data);
				}, xhrUtils.failedRequest);
			});
		}

		return element;
	}
})();


