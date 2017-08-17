import { Component,OnInit} from '@angular/core';
import {DataParserService} from '../../../services/dataParser.service';
import { FormsModule }   from '@angular/forms';
declare var $: any;
@Component({
  selector: 'reset-pwd-form',
  templateUrl: './reset_password.component.html',
  styleUrls: ['./reset_password.component.css']
})
export class ResetPassword implements OnInit {
  public pwd:any;
  public new_pwd:any;
  public re_pwd:any;
  public emailInput:any;
 
  constructor(private _dataParserService: DataParserService) {}

  ngOnInit() {
   this._dataParserService.userData();
  }
  private Close(){
    this._dataParserService.ForgetPwd=false;
  }

  private changePassword(){
     this._dataParserService.changePassword();
  }

  private sendPasswordResetLink()
    {
        $("#messageDiv").empty();
        var that=this;
        var localData;

        this._dataParserService.sendPasswordResetLink(this.emailInput).subscribe(data=>
        {
            localData=data;
            if(localData == "-1")
            {
                $("#messageDiv").html('<span class="text-danger">Please enter your email!</span>');
            }
            else if(localData == "-2")
            {
                $("#messageDiv").html('<span class="text-danger">Email does not exist!</span>');
            }
            else if(localData == "1")
            {
                $("#messageDiv").html('<span class="text-success">We have sent you reset password link. Please check your mail.</span>');
            }
            else
            {
                $("#messageDiv").html('<span class="text-danger">Error occurred while processing!</span>');
            }
        },);
    }

    private forgotPasswordModal()
    {
        $("#messageDiv").empty();
        $("#signinModal").modal("hide");
        $("#emailInput").val('');

        setTimeout(function()
        {
            $("#forgotPasswordModal").modal("show");
        },500);
        
    }
     
}
