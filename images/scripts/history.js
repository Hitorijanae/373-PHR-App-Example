var Database;
$(document).ready(function(){
	$(".back").css({
		"position":"absolute",
		"z-index":"999",
	});
	var height = $(document).height();
	
	$("#health_history_ul").css({
		"top":"45px",
		"height":"height-45",
	});
	
	myDatabase = new myDB();
	myDatabase.appendDivId = "health_history_ul";
	myDatabase.openDB();
	myDatabase.getHistory();
});

$("#add_new_item").on("click",function(){
	$("#add_item_screen").load("additem.html",function(){
		
	});
	$("#add_item_screen").css({
		"z-index":"999",
	});
	slideoneup("add_item_screen");
});

$("#history_back").on("click",function(){
	slideright("list_of_history_screen","profile_screen");
	setTimeout(function(){
		$("list_of_history_screen").empty();
	},500);
});

var myDB = function(){
	this.db;
	
	this.appendDivId;
	
	this.openDB = function(){
		this.db = openDatabase("History","1.0","Items",2 * 1024 * 1024);
		this.db.transaction(function(tx){
			tx.executeSql('CREATE TABLE IF NOT EXISTS history (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,now, created, title, notes)');
		});
	}
	
	this.getHistory = function(){
		var self = this;
		this.db.transaction(function(tx){
			tx.executeSql('SELECT * FROM history', [], querySuccess, errorCB);
		});
			function querySuccess(tx, results){
				var len = results.row.length;
				
				if(error){
				throw(error)
				}
				else{
					if(len > 0)
					{
						var htmlArray = [];
					
						for(var i = 0;i < len; i++){
							var html = "<li id = '" + results.row.item(i).now + "'class = 'history_li'><span class = 'delete_item'>x</span><span class = 'h title'>" + results.rows.item(i).title + "</span><span class = 'h_notes'>" + "</span> </li>";
							$("#" + self.appendDivId).append(html);
						
							var id = results.rows.item(i).now;
							$("#" + results.rows.item(i).now).children(".delete_item").on("click", function(){
								self.deleteQuery(id);
							});
						}
					}
					else{
					
					}
				}
			}
			function errorCB(err){
				alert("We're Embarrassed!");
			}
	}
	
	this.enterNewItem = function(obj){
		var self = this;
		console.log(obj.now);
		console.log(obj.title);
		console.log(obj.notes);
		function populateDB(tx){
			tx.executeSql('INSERT INTO history(now, created, title, notes) VALUES(?, ?, ?, ?)'[obj.now, obj.now, obj.title, obj.notes]);;
		}
		
		function errorCB(err){
			alert("There was an error");
		}
		
		function successCB(){
			$("#" + self.appendDivId).append("<li id='" + obj.now + "'class='history_li'><span class='delete_item'>x</span><span class='h_title'>" + obj.title + "</span><span class='h_notes'>" + obj.notes + "</span></li>");
			$("#" + obj.now).children("delete_item").on("click", function(){
				self.deleteQuery(obj.now);
			});
		}
		
		this.db.transaction(populateDB, errorCB, successCB);
	}
	
	this.deleteQuery = function(id)
	{
		function deleteDB(tx){
			tx.executeSql("DELETE FROM history WHERE now = " + id + "");
		}
		
		function errorCB(err){
			alert("Whoops! That was strange!");
		}
		
		function successCB(){
			$("#" + id).remove();
		}
		
		this.db.transaction(deleteDB, errorCB, successCB);
	}
	
};