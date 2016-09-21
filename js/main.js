$("#panelProjects").ready(function(){
	$.getJSON("modal/find_projects.php",function(data){
		var projects = data;
		if(data["success"]!=0){
			$.each(projects,function(i, c){
				$.each(c, function(index, e){
				//method 1
				//$("#projectLists").append("<a href=#  class=\"list-group-item\">"+ e.projectName+"</a>");
				
				//method 2
				$("#projectLists").append($("<a></a>").attr("href","wiki.php").addClass("list-group-item").html(e.projectName));
				});
			});
		}else{
			$("#projectLists").append($("<div></div>")
			.addClass("alert alert-info")
			.html(data["message"])
			);
		}
	});
});

$("#frmNewProject").submit(function(e){
	NProgress.start();
	e.preventDefault();
	$.ajax({
		beforeSend:function(){
			NProgress.set(0.5);
		},
		type: "POST",
		url: "modal/create_newProject.php",
		data: $("#frmNewProject").serialize(),
		dataType:"JSON",
		success:function(data){
			switch(data["success"]){
				case 0:
					NProgress.done();
					$("#projectModal").modal("toggle");
					$("#snackbar").html("Failed to create new project. Hope you are not mad &#58X");
					$("#snackbar").css("background-color", "#c0392b");
					$("#snackbar").css("visibility", "visible").fadeOut(6000);
				break;
				case 1:
					NProgress.done();
					$("#projectLists").find(".alert-info").remove();
					$("#snackbar").html("New project is created &#58&#41");
					$("#projectModal").modal("toggle");
					$("#snackbar").css("visibility", "visible").fadeOut(6000);
					$("#projectLists").append($("<a></a>").attr("href","wiki.php").addClass("list-group-item").html(data["message"]));
					
				break;
			}
		}		
	});
});

$("#frmLogin").submit(function(e){
	e.preventDefault();
	$.ajax({
		type: "POST",
		url: "modal/login_action.php",
		data: $("#frmLogin").serialize(),
		dataType: "JSON",
		success: function(data) {
			switch(data["success"]){
				case 0:
					document.location.href= "dashboards.php";
				break;
				case 1:
				$("#snackbar").css("background-color", "#c0392b");
				$("#snackbar").html("Password not match.&#58X");
				$("#snackbar").css("visibility", "visible").fadeOut(6000);
				break;
				case 2:
				$("#snackbar").css("background-color", "#c0392b");
				$("#snackbar").html("No such users found! .&#58X");
				$("#snackbar").css("visibility", "visible").fadeOut(6000);
				$("#frmLogin").trigger("reset");
				break;
			}
		}
	});
});
$("#frmRegister").submit(function(e){
	NProgress.start();
	e.preventDefault();
    $.ajax({
		beforeSend:function(){
			NProgress.set(0.5);
		},
		type:"POST",
		url:"modal/register_action.php",
		data: $("#frmRegister").serialize(),
		dataType:"JSON",
		success:function(data){
			switch(data["success"]){
				case 0:
					NProgress.done();
					$("#frmRegister").trigger("reset");
					$("#registerModal").modal("hide");
					$("#snackbar").css("background-color", "#c0392b");
					$("#snackbar").html("Something seriously wrong at server side. &#58X");
					$("#snackbar").css("visibility", "visible").fadeOut(6000);
				break;
				case 1:
					NProgress.done();
					$("#frmRegister").trigger("reset");
					$("#registerModal").modal("hide");
					$("#snackbar").html("Registered successfully &#58&#41");
					$("#snackbar").css("visibility", "visible").fadeOut(6000);
					
				break;
				case 2:
					NProgress.done();
					$("#frmRegister").trigger("reset");
					$("#registerModal").modal("hide");
					$("#snackbar").css("background-color", "#c0392b");
					$("#snackbar").html("Password not match.&#58X");
					$("#snackbar").css("visibility", "visible").fadeOut(6000);
					
				break;
				case 3:
					NProgress.done();
					$("#frmRegister").trigger("reset");
					$("#registerModal").modal("hide");
					$("#snackbar").css("background-color", "#c0392b");
					$("#snackbar").html("Email is being used. Hope you are not mad.&#58X");
					$("#snackbar").css("visibility", "visible").fadeOut(6000);
				break;
				case 4:
					NProgress.done();
					$("#frmRegister").trigger("reset");
					$("#registerModal").modal("hide");
					$("#snackbar").css("background-color", "#c0392b");
					$("#snackbar").html("You should not have seen this message. &#58X");
					$("#snackbar").css("visibility", "visible").fadeOut(6000);
				break;
				
				
			}
			
		}
		
	});
});
