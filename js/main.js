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
					$("#snackbar").css("visibility", "visible").fadeOut(4000);
				break;
				case 1:
					NProgress.done();
					$("#snackbar").html("New project is created &#58&#41");
					$("#projectModal").modal("toggle");
					$("#snackbar").css("visibility", "visible").fadeOut(4000);
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
