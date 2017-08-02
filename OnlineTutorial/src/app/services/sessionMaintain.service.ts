import { Injectable } from '@angular/core';



@Injectable()
export class SessionStorageService {
    
    setUsername(name){
        sessionStorage.setItem('username', name);
    }
    getUsername(){
        return sessionStorage.getItem('username');
    }
}