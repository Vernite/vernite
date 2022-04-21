import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
})
export class BoardPage implements OnInit {
  public columns = [
    {
      name: 'To Do',
      tasks: [
        {
          id: 1,
          name: 'Task 1',
          description: 'Task 1 description',
        },
        {
          id: 2,
          name: 'Task 2',
          description: 'Task 2 description',
        },
      ],
    },
    {
      name: 'In progress',
      tasks: [
        {
          id: 3,
          name: 'Task 3',
          description: 'Task 3 description',
        },
      ],
    },
  ];

  constructor(private activatedRoute: ActivatedRoute) {
    const { workspaceId, projectId } = this.activatedRoute.snapshot.params;
    console.log({ workspaceId, projectId });
  }

  ngOnInit() {}
}
