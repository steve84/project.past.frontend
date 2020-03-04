import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { take } from 'rxjs/operators';

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

    constructor(private userService: UserService) { }

    ngOnInit() {
    }

    login() {
        this.userService.login(this.loginForm.get('username').value, this.loginForm.get('password').value)
            .pipe(take(1))
            .subscribe((resp: any) => {
                debugger
                localStorage.setItem('token', resp.token);
            });
    }

}
