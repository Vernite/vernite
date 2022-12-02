import { Component, OnInit } from '@angular/core';
import { SlackProtoService } from '@messages/services/slack/slack.proto.service';
import { FormGroup, FormControl } from '@ngneat/reactive-forms';
import dayjs from 'dayjs';
import { UserService } from '../../../auth/services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'conversation-page',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {
  public user$ = this.userService.getMyself();
  public form = new FormGroup({
    message: new FormControl(''),
  });

  private channel!: string;

  public conversation$ = of([
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
  ]);

  constructor(
    private userService: UserService,
    private slackProtoService: SlackProtoService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ channel }) => {
      this.channel = channel;
    });
  }

  sendMessage() {
    // const content = this.form.value.message;
    // const channel = this.channel;
    // this.slackProtoService.sendMessage(content, channel);
    // this.conversation$.next([
    //   ...this.conversation$.value,
    //   {
    // ])
  }
}
