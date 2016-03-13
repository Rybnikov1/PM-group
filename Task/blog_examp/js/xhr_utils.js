var xhrUtils = (function () {

	function getByID(id, locator, callbackSuccess, callbackFailure) {   
		request("GET", null, id, locator, callbackSuccess, callbackFailure);
	}

	function getAll(locator, callbackSuccess, callbackFailure) {   
		request("GET", null, null, locator, callbackSuccess, callbackFailure);
	}

	function create(data, locator, callbackSuccess, callbackFailure) {
		request("POST", data, null, locator, callbackSuccess, callbackFailure);
	}

	function update(data, id, locator, callbackSuccess, callbackFailure) {
		request("PUT", data, id, locator, callbackSuccess, callbackFailure);
	}

	function deleteRecord (id, locator, callbackSuccess, callbackFailure) {
		request("DELETE", null, id, locator, callbackSuccess, callbackFailure);
	}

	function request (type, data, resourceId, locator, callback, failure) {
		var newRequest = new XMLHttpRequest(),
			id = resourceId ? resourceId : "",
			uri = 'http://localhost:3000/' + locator + '/' + id;

		newRequest.open(type, uri, true);

		//setRequestHeader - Задает заголовоки для запроса. 
		//В данном случае, сервер принимает JSON, для этого устанавливаем тип содержимого
		newRequest.setRequestHeader("Content-Type", "application/json");

		//JSON.stringify превращает JavaScript-обьект в JSON строку
		newRequest.send(data ? JSON.stringify(data) : null);

		newRequest.addEventListener("load", function () {
			console.log("Request complete");
			if (newRequest.status === 200 || newRequest.status === 201) {
				console.log("Success!!!");
				if (callback) {
					callback(JSON.parse(newRequest.responseText), newRequest);					
				}
			} else if (failure) {
				failure(JSON.parse(newRequest.responseText));
			}
		});
	}	

	function failedRequest (response) {
		console.error(responseText);
	}

	return {
		getByID: getByID,
		getAll: getAll,
		create: create,
		update: update,
		deleteRecord: deleteRecord
	}  
})();