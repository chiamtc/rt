<!-- Register Modal-->
<div class="modal fade bs-exmaple-modal-md registerM" id="registerModal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-md registerM-dialog" role="document">      
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Registration</h4>
            </div>
			<form name="form" class="form-horizontal" id="frmRegister">
				<div class="modal-body">
					
						<div class="input-group">
							<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
							<input type="email" id="email" name="email" placeholder="Email" class="form-control" required>
						</div>
							<span id="emailError"></span>
							<br>
						<div class="input-group">
							<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
							<input type="password" placeholder="Password" class="form-control" name="password" required>
						</div>
							<span id="password"></span>
							<br>
						<div class="input-group">
							<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
							<input type="password"  placeholder="Confirm Password" name="passwordRepeat" class="form-control" required>
						</div>
							<span id="passwordRepeat"></span>
							<br>
					
				</div>
				<div class="modal-footer">
					<button type="submit" class="btn btn-primary" id="btnRegister">Register</button>
				</div>
			</form>
		</div>
	</div>
</div>