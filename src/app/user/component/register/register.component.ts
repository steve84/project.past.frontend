import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = new User();

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
});

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  register() {
    this.user = {
      ...this.user,
      username: this.registerForm.get('username').value,
      password: this.registerForm.get('password').value
  } as User;

    this.userService.register(this.user).subscribe(() => {});
}

}
