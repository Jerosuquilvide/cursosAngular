import { Component, OnInit } from '@angular/core';

import { StoreService } from '../../services/store.service'
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  profile : User | null = null;
  constructor(
    private storeService: StoreService,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }
  // login(){
  //   this.authService.login('jero@email.com','123123')
  //   .subscribe(rta =>{
  //     this.token = rta.access_token;
  //     this.getProfile();
  //   })
  // }

  // getProfile(){
  //   this.authService.profile(this.token)
  //   .subscribe(user =>{
  //     this.profile = user
  //   })
  // }

  loginAndGetProfile() {
    // this.authService.login('jero@email.com','123123')
    // // .subscribe(rta =>{
    // //   this.token = rta.access_token;
    // // })
    this.authService
      .fetchLoginAndProfile()
      .subscribe((user) => (
          this.profile = user,
          console.log(user)
        )
      );
      
  }
}
