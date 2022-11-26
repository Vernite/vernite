import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@ngneat/reactive-forms';
import dayjs from 'dayjs';
import { UserService } from '../../../auth/services/user/user.service';

@Component({
  selector: 'conversation-page',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage {
  public user$ = this.userService.getMyself();
  public form = new FormGroup({
    message: new FormControl(''),
  });

  public conversation = [
    {
      author: '...',
      messages: [
        {
          content: 'Hello, how are you?',
          createdAt: dayjs().valueOf(),
        },
      ],
    },
    {
      author: '...',
      messages: [
        {
          content: 'I am fine, thanks!',
          createdAt: dayjs().valueOf(),
        },
        {
          content: 'How are you?',
          createdAt: dayjs().valueOf(),
        },
      ],
    },
    {
      author: '...',
      messages: [
        {
          content: 'I am fine, thanks!',
          createdAt: dayjs().valueOf(),
        },
      ],
    },
  ];

  constructor(private userService: UserService) {}
}
