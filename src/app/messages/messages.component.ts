import { MessagesService } from './messages.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../model/message';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
    showMessages = false;
    errors$: Observable<string[]>;

    constructor(public messages: MessagesService) {

    }

    ngOnInit() {
        this.errors$ = this.messages.errors$
            .pipe(
                tap(() => this.showMessages = true)
            );

    }


    onClose() {
        this.showMessages = false;
    }

}
