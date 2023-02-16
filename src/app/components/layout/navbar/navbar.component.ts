import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMenu } from 'src/app/models/navbar.model';
import { IUser } from 'src/app/models/user.model';
import { RegisterService } from 'src/app/services/register/register.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterContentChecked {

    // ** Menu
    Menus: IMenu[] = [
        { id: 'home', title: 'Home', url: '' },
        { id: 'question', title: 'Ask Question', url: 'question' },
        { id: 'account', title: 'Account', url: 'account' },
    ];

    // ** User Data
    UserData: IUser = null as any;

    constructor(
        private router: Router,
        private registerService: RegisterService,
    ) { }

    ngOnInit(): void {
    }

    ngAfterContentChecked(): void {
        this.UserData = JSON.parse(localStorage.getItem("UserDataQNA") as any);

        if (this.UserData) {
            this.Menus = [
                { id: 'home', title: 'Home', url: '' },
                { id: 'question', title: 'Ask Question', url: 'question' },
            ];
        } else {
            this.Menus = [
                { id: 'home', title: 'Home', url: '' },
                { id: 'account', title: 'Account', url: 'account' },
            ];
        }
    }

    handleClickMenu(menu: IMenu): void {
        this.router.navigateByUrl(menu.url);
    }

    handleLogout(): void {
        this.registerService.logout();
    }
}
