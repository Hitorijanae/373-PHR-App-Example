$("#health_history_button").on("click",function(){
	$("#list_of_history_screen").show(0);
		slideleft("profile_screen","list_of_history_screen");
		$("#list_of_history_screen").load("history.html", function(){
		})
});

$("#settings_page_button").on("click",function(){
	slideoneup("settings_screen");
		$("#settings_screen").load("settings.html",function(){
		})
});
$(document).ready(function(){
	setProfileInfo();
});

function setProfileInfo(){
	var localSettings = ["name","age","weight","age"];
	var ids = ["my_name","date_of_birth","current_weight","current_age"];
	for(i=0;i<localSettings.length;i++){
		var exists = localStorage.getItem(localSettings[i]);
		if(exists){
			$("#"+ids[i]).text(exists);
		}
		else{
		}
	}

	var dob = localStorage.getItem("age");
	$("#current_age").text(dobToYears(dob));
}

function dobToYears(a){
	const current_date = new Date();
	const dob = new Date(a);
	if(current_date.getMonth() >= dob.getMonth() && current_date.getDay() >= dob.getDay()){
		return (current_date.getYear() - dob.getYear());
		console.log(current_date.getYear() - dob.getYear());
	}
}