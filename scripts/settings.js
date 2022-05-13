$("#settings_back").on("click",function(){
	//slideonedown("settings_screen");
	slideright("settings_screen","profile_screen");
	setTimeout(function(){
		$("#settings_screen").empty();
	},500);
});
$(document).ready(function(){
	$("#settings_back").css({
		"position":"absolute",
		"z-index":"1000",
	});
	
	setSettingsValuesIfThere();
});

$("#information_form").on("submit",function(e){
	e.preventDefault();
	var my_name = $("#person_name").val();
	var my_age = $("#age_picker").val();
	var my_weight = $("#person_weight").val();
	
	var obj = {
		"name":my_name,
		"age":my_age,
		"weight":my_weight,
	};
	
	localStorage.setItem("name",obj.name);
	localStorage.setItem("age",obj.age);
	localStorage.setItem("weight",obj.weight);
	
	console.log(localStorage.getItem('name'));
	
	updateProfileInformation();
	
	$(".back").trigger("click");
});

function setSettingsValuesIfThere(){
	var localSettings = ["name","age","weight"];
	var ids  = ["person_name","age_picker","person_weight"];
	for(i=0;i<localSettings.length;i++){
		var exists =  localStorage.getItem(localSettings[i]);
		if(exists){
			$("#"+ids[i]).val(exists);
		}
		else{
		}
	}
}

function updateProfileInformation(){
	var localSettings = ["name","age","weight","age"];
	var ids = ["my_name","date_of_birth","current_weight","date_of_birth"];
	for(i=0;i<localStorage.length;i++){
		var exists = localStorage.getItem(localSettings[i]);
		if(exists){
			$("#"+ids[i]).text(exists);
		}
		else{
		}
	}
}
