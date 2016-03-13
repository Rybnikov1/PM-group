/**
 * Created by rybnikov_ivan on 29.02.16.
 */

function addNewItem(list, itemText) {
    totalItems++;
    var date = new Date();
    var listItem = document.createElement("li");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "cb_" + totalItems;
    var span = document.createElement("span");
    span.id = "item_" + totalItems;
    span.innerHTML = itemText;
    var delButton = document.createElement("button");
    delButton.innerHTML = "delete";
    delButton.classList.toggle("delB");
    delButton.id = "db_" + totalItems;
    listItem.appendChild(checkbox);
    listItem.appendChild(span);
    listItem.appendChild(delButton);
    list.appendChild(listItem);
    checkbox.addEventListener("click", updateItemStatus);
    delButton.addEventListener("click", function(){
        listItem.remove();
    });
    span.addEventListener("dblclick", function(){
        span.setAttribute("contenteditable", "");
    })

}

var btn = document.getElementById("btnNewItem");
var totalItems = 0;
var itemVal = document.getElementById("itemText");
itemVal.focus();

btn.addEventListener("click", function() {

    var itemText = itemVal.value;
    if(!itemText || itemText == "" || itemText == " "){
        return false;
    }
    addNewItem(document.getElementById("taskList"), itemText);
});



function updateItemStatus(){

    var cbId = this.id.replace("cb_", "");
    var innerText = document.getElementById("item_" + cbId);
    innerText.classList.toggle("checked");
}

