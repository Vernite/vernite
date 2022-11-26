import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesRoutingModule } from './messages.routing';
import { ConversationPage } from './pages/conversation/conversation.page';
import { MessengerSidebarComponent } from './components/messenger-sidebar/messenger-sidebar.component';
import { MessengerPage } from './pages/messenger/messenger.page';
import { MainModule } from '@main/_main.module';
import { MessageComponent } from './components/message/message.component';
import { MessageGroupComponent } from './components/message-group/message-group.component';

@NgModule({
  imports: [CommonModule, MainModule, MessagesRoutingModule],
  declarations: [
    ConversationPage,
    MessengerSidebarComponent,
    MessengerPage,
    MessageComponent,
    MessageGroupComponent,
  ],
})
export class MessagesModule {}
