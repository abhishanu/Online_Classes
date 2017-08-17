import { Component,OnInit} from '@angular/core';

import {DataParserService} from '../../../services/dataParser.service';
import {SessionStorageService} from '../../../services/sessionMaintain.service';


declare var $:any;

@Component({
  selector: 'student-wall',
  templateUrl: './studentWall.component.html'
})
export class StudentWall implements OnInit
{
  
  private readonlyName:boolean=true;
  private readonlyEmail:boolean=true;
  private readonlyContact:boolean=true;
  private Studentname:any="";
  private StudentEmail:any="";
  private StudentContact:any="";
  private StudentId:any="";

  
    ngOnInit()
    {
        //alert(this._sessionService.getUserEmail());
        this.Studentname=this._sessionService.getUsername();
        this.StudentEmail=this._sessionService.getUserEmail();
        this.StudentContact=this._sessionService.getUserContact();
        this.StudentId=this._sessionService.getUserId();

        this._dataParserService.UserProfileData();
        $(".detailsPopOver").popover({
            placement:'right',
            Content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

        });

    
      


    }
    constructor(private _dataParserService: DataParserService, private _sessionService: SessionStorageService) {
    }
    
    public saveStudentProfile()
    {
        this._dataParserService.saveStudentInfo(this.Studentname,this.StudentEmail, this.StudentContact, this.StudentId)
            .subscribe(data=>
            {
                //console.log(localData.Name);
                if(data == "1")
                {
                    alert("Save information successfully.");

                    // set session while student info successfully edit
                    this._sessionService.setUsername(this.Studentname);
                    this._sessionService.setUserEmail(this.StudentEmail);
                    this._sessionService.setUserContact(this.StudentContact);

                    location.reload();
                }
                else if(data == "-1")
                {
                     alert("Please fill all fields.");
                }
                else if(data == "-2")
                {
                     alert("Email already exist.");
                }
                else
                {
                    alert("error");
                }
            },
            ()=>console.log('finish')
            );
    }
  
     
}
