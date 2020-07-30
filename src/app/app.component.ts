import { AuthStore } from './services/auth.store';
import { MessagesService } from './messages/messages.service';
import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading/loading.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [
        LoadingService,
        MessagesService
    ]
})
export class AppComponent implements OnInit {

    constructor(public authStore: AuthStore) {

    }

    ngOnInit() {


    }

    logout() {
        this.authStore.logout();
    }

}
