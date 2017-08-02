import { Injectable } from '@angular/core';



@Injectable()
export class SessionStorageService {
    
    setUsername(name){
        sessionStorage.setItem('username', name);
    }
    getUsername(){
        return sessionStorage.getItem('username');
    }

    signOut(){
        sessionStorage.clear();
    }

    setRememberUserName(name){
        localStorage.setItem('username',name);
    }

    getRememberUserName(){
        return localStorage.getItem('username');
    }

    rememberMeFalse(){
        localStorage.clear();
    }
    
}