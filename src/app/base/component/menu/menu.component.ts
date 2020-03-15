import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/service/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    constructor(private router: Router,
                private userService: UserService) { }

    ngOnInit(): void {
    }

    isUserLoggedIn(): boolean {
        return !!this.userService.getActualUser();
    }

    getActualUsername(): string {
        return this.userService.getActualUser().username;
    }

    logout() {
        localStorage.removeItem('token');
        this.userService.setActualUser(null);
        this.router.navigate(['/login']);
    }
}
