$(document).ready(function(){
	$("#exit_add_item").css({
		"position":"absolute",
		"z-index":"999",
	})
	
	$("#add_history_item_form .submit_button").attr("disabled",true);
});

$("#add_history_item_form input").on("keyup",function(){
	if($(this).val().length==0){
		$("#add_history_item_form .submit_button").attr("disabled",true);
	}
	else{
		$("#add_history_item_form .submit_button").attr("disabled",false);
	}
});

$("#exit_add_item").on("click",function(){
	slideonedown("add_item_screen");
	setTimeout(function(){
		$("#add_item_screen").empty();
	},500);
});

$("#add_history_item_form input").on("focus",function(){
	$(this).removeClass("error");
});

$("#add_history_item_form input").on("blur", function(){
	checkForText($(this));
	checkErrorLength();
});

function checkForText(element){
	if(element.val().length==0){
		element.addClass("error");
	}
}

function checkErrorLength(){
	if(!addItemFormValidated()){
		$("#add_history_item_form .submit_button").attr("disabled",true);
	}
	else{
		$("#add_history_item_form .submit_button").attr("disabled",false);
	}
}

$("#add_history_item_form").on("submit",function(e){
	e.preventDefault();
	
	if(addItemFormValidated()){
		var title = $("#new_item_title").val();
		var notes = $("#add_new_item_textarea").val();
		var now = $.now();
		
		if(!myDatabase){
			myDatabase = new myDB;
			myDatabase.appendDivId = "health_history_ul";
			myDatabase.openDB();
		}
		
		var obj = {
			"title":title,
			"notes":notes,
			"now":now,
			"created",now,
		}
		
		myDatabase.enterNewItem(obj);
		$("#exit_add_item").trigger("click");
	}
	else{
		alert("There was an error!");
	}
});

function addItemFormValidated(){
	var len = $(".error").length;
	if(len > 0){
		return false;
	}
	return true;
}