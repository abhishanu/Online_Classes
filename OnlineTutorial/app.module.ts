import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';

import{Header} from './header/header.component';
import {SignUp} from './header/signUp/signUp.component';
import {SignIn} from './header/signIn/signIn.component';
import {ForgetPassword} from './header/signIn/forget-password/forget_password.component';


import{DataParserService} from './services/dataParser.service';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    Header,
    SignUp,
    SignIn,
    ForgetPassword
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [DataParserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
