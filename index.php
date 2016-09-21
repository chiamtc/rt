<?php
if(!empty($_COOKIE['uid'])){
	header("Location:dashboards.php");
}
require "assets/document-header.php";
require "assets/header.php";
?>

<div class="container">
		<div class="row">
			<div class="login col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3">
				<div class="panel panel-primary">
					<div class="panel-heading">
						<div class="text-center">C-based RE Tool</div>
					</div>
					
					<div class="panel-body">
						<form name="form" id="frmLogin" class="form-horizontal">
							
							<div class="input-group">
								
							<span class="input-group-addon"><i class="glyphicon glyphicon-user" aria-hidden="true"></i>
							</span>
								<input id="email" type="text" class="form-control" name="email" placeholder="Email">
							</div>
							<br>
							
							<div class="input-group">
								<span class="input-group-addon"><i class="glyphicon glyphicon-lock" aria-hidden="true"></i>
								</span>
								<input id="password" type="password" class="form-control" name="password" placeholder="Password">
							</div>
							
							<div class="checkbox">
								<label>
									<input type="checkbox">Remember me
								</label>
                                <button style="float:right" type="submit" class="btn btn-primary">Login</button>
							</div>
                        </form>
                        <hr>
                        
                        <div class="text-center">
                        <p>No account? Register here for free !</p>
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#registerModal">Register</button>
                        </div>
                        
                        
				</div><!-- panel body -->
			</div> <!-- panel-primary -->
		</div>
	</div>
</div>
<div id="snackbar"></div>

<?php
require "assets/register.php";
require "assets/document-footer.php";
?>

