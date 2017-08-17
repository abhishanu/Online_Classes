import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';

import{Header} from './header/header.component';
import {SignUp} from './header/signUp/signUp.component';
import {SignIn} from './header/signIn/signIn.component';
import {ResetPassword} from './header/signIn/reset-password/reset_password.component';
import {UserMenu} from './header/userMenu/userMenu.component';
import {StudentWall} from './header/userMenu/studentWall/studentWall.component';
import {ImageSlider} from './common/image-slider/image-slider.component';

import{DataParserService} from './services/dataParser.service';
import{SessionStorageService} from './services/sessionMaintain.service';
import{ValidationService} from './services/validation.service';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    Header,
    SignUp,
    SignIn,
    ResetPassword,
    UserMenu,
    StudentWall,
    ImageSlider
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [DataParserService,SessionStorageService,ValidationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
