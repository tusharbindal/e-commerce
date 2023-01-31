import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { login, Signup } from '../data-type';
import{BehaviorSubject} from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false)
  isLoginError = new EventEmitter<boolean>(false)

  // url = "http://localhost:3000/seller";
  constructor(private http:HttpClient, private router:Router) { }

  userSignUp(data:Signup){
    // for data handling create object ya pass object in post Api to usko observe krna hota hai observe ki value response rakhni hoti hai
  this.http.post('http://localhost:3000/seller',
  data,
  { observe: 'response'}).subscribe((result)=>{
    console.warn(result)
    if(result){
    
    // this.isSellerLoggedIn.next(true);
    localStorage.setItem('seller',JSON.stringify(result.body))
    this.router.navigate(['seller-home']);
    }

  })
  }
  reloadSeller(){
    if(localStorage.getItem('seller')){
     this.router.navigate(['seller-home']);
    }
  }

  userLogin(data:login){
    console.warn(data)
    // API CAll 
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
    { observe: 'response'}).subscribe((result:any)=>{
      console.warn(result)
      if(result && result.body && result.body.length){
      console.warn("user logged in"); 
      localStorage.setItem('seller',JSON.stringify(result.body))
    this.router.navigate(['seller-home']);
      }
      else{
        console.warn("login failed");
        this.isLoginError.emit(true)
        
      } 
    })

   
    

  }
}
