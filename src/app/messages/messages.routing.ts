import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConversationPage } from './pages/conversation/conversation.page';
import { MessengerSummaryPage } from './pages/messenger-summary/messenger-summary.page';
import { MessengerPage } from './pages/messenger/messenger.page';
import { MessagesNoIntegration } from './pages/messages-no-integration/messages-no-integration.page';

/**
 * Messages routes list
 */
const routes: Routes = [
  {
    path: '',
    component: MessengerPage,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: MessengerSummaryPage,
      },
      {
        path: 'no-integration',
        component: MessagesNoIntegration,
      },
      {
        path: ':integrationId/:channelId',
        component: ConversationPage,
      },
    ],
  },
];

/**
 * Messages routes module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagesRoutingModule {}
