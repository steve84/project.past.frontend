import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });

    constructor(private router: Router,
                private userService: UserService) { }

    ngOnInit() {
    }

    login() {
        this.userService.login(this.loginForm.get('username').value, this.loginForm.get('password').value).pipe(
            switchMap(loginResp => {
                localStorage.setItem('token', loginResp.token);
                return this.userService.getUser(this.loginForm.get('username').value)
            })).subscribe((userResp) => {
                this.userService.setActualUser(userResp);
                this.router.navigate(['/']);
            });
    }
}
