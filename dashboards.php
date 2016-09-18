<?php
require "assets/document-header.php";
require "assets/header.php";
?>

<div class="container" style="width:80%">
	<div class="row">
		<div class="col-md-12 col-md-offset-0">
			<div class="panel panel-primary">
				<div class="panel-body">
				
					<hr><input class="btn btn-default" type="button" value="Create New Project" data-toggle="modal" data-target="#projectModal"/>
				</div><!-- panel body -->
			</div> <!-- panel-primary -->
		</div>
</div>
</div>
<div id="snackbar"></div>

<!-- Modal -->
<div class="modal fade" id="projectModal" data-backdrop="false" aria-hidden="true" role="dialog" tabindex="-1" aria-labelledby="projectModal">
    <div class="modal-dialog">
      <!-- Modal content-->
      <div class="modal-content">
		
		<div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">New Project</h4>
        </div>
        <form name="form" id="frmNewProject" class="form-horizontal">
		<div class="modal-body">
		
			<div class="input-group">
				<span class="input-group-addon"><i class="glyphicon glyphicon-blackboard" aria-hidden="true"></i></span>
				<input id="projectName" type="text" class="form-control" name="projectName" placeholder="Project Name">
			</div>
			<br>
			
			<div class="input-group">
				<span class="input-group-addon"><i class="glyphicon glyphicon-comment" aria-hidden="true"></i></span>
				<textarea id="projectDesc" class="form-control" rows="4" name="projectDesc" placeholder="Project Description"></textarea>
			</div>		
			
		</div>
		<div class="modal-footer">
			<button type="submit" id="btnCreateProject" class="btn btn-default"/>Create Project</button>
		</div>
		</form>
      </div>
      
    </div>
  </div>
<?php
require "assets/document-footer.php";
?>

