import { Component } from '@angular/core';
import {DataParserService} from '../../services/dataParser.service';
import{ValidationService} from '../../services/validation.service';
import { FormsModule }   from '@angular/forms';

declare var $: any;

@Component({
  selector: 'signUp',
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.css']
})
export class SignUp {
  private name:string;
  private SignUpemail:any;
  private pwd:any;
  private phone:Number;
  private _otp:Number;
  private confirm:any='';
  private type:any;
  
constructor(private _dataParserService: DataParserService,private _validator: ValidationService) {} 

private SubmitForm()
{
  var verifyForm:boolean=true;
   
  $("#msgDiv").text('');

  if(this.pwd != this.confirm)
  {
      $("#msgDiv").text("Password and Confirm Password not matched")
                  .css("color", "red");
      verifyForm=false;
      return;
  }
   if( !this._validator.validateMailId()){
       $('#msgDiv').text("Please Enter a valid Mail Id")
                    .css("color", "red");
      verifyForm=false;
      return;
  }
  
  if(!this._validator.validateMobile()){
    $('#msgDiv').text("Please Enter a valid moblie no")
                .css("color", "red");
    verifyForm=false;
    return;
  }
  

    if(verifyForm){
      let status:any;

      this._dataParserService.SignUp(this.name,this.SignUpemail,this.phone,this.pwd,this.confirm, this.type)
      .subscribe(data=>
        {
            status=data;
            if(status=="1"){
              this.Close();
            }
            else if(status=="-1"){
              $("#msgDiv").html("Please fill all fields!");
            }
            else if(status=="-2"){
              $("#msgDiv").html("Password and Confirm Password is not matching");
            }
            else if(status=="-3"){
              $("#msgDiv").html("Email or Contact already exist!");
            }
            else
            {
              $("#msgDiv").html("There is some internal error!");
            }
          },
          error=>alert("error")
        );
    }
  
}

  private Close(){
    this._dataParserService.signUp=false;
  }
}
