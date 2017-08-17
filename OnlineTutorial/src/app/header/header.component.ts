import { Component,OnInit  } from '@angular/core';
import {DataParserService} from '../services/dataParser.service';
import{SessionStorageService} from '../services/sessionMaintain.service';
import { FormsModule }   from '@angular/forms';
import {SignUp} from './signUp/signUp.component';
import {SignIn} from './signIn/signIn.component';

declare var $: any;

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class Header implements OnInit {
  
    private emailInput:any;

    ngOnInit()
    {
      var username= this._sessionStorage.getUsername();
      if(username){
          this._dataParserService.authorized=true;
          this._dataParserService.signIn=false;
          this._dataParserService.signUp=false;
      }

      $('input.typeahead').typeahead(
      {
          source:  function (query, process) 
          {
              return $.get('http://localhost/OnlineTutorial/controllers/controllers.php?action=searchSuggestion',
              { query: query }, function (data) 
              {
                  data = $.parseJSON(data);
                  return process(data);
              });
          }
      });

    }
    
   constructor(private _dataParserService: DataParserService,private _sessionStorage:SessionStorageService) {} 

   private signInFunc(){
    this._dataParserService.signIn=!this._dataParserService.signIn;
    this._dataParserService.signUp=false;
    this._dataParserService.ForgetPwd=false;
  }

  private signUpFunc(){
     this._dataParserService.signUp=!this._dataParserService.signUp;
     this._dataParserService.signIn=false;
     this._dataParserService.ForgetPwd=false;
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
