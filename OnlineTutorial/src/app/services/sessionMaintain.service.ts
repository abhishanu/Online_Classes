import { Injectable } from '@angular/core';



@Injectable()
export class SessionStorageService {
    
    setUsername(name){
        sessionStorage.setItem('username', name);
    }
    getUsername(){
        return sessionStorage.getItem('username');
    }

    setUserEmail(email){
        sessionStorage.setItem('userEmail', email);
    }
    getUserEmail(){
        return sessionStorage.getItem('userEmail');
    }

    setUserContact(contact){
        sessionStorage.setItem('userContact', contact);
    }
    getUserContact(){
        return sessionStorage.getItem('userContact');
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

    setUserId(id){
        sessionStorage.setItem('userId', id);
    }
    getUserId(){
        return sessionStorage.getItem('userId');
    }

    rememberMeFalse(){
        localStorage.clear();
    }
    
}