import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '@tasks/interfaces/status.interface';

@Pipe({
  name: 'statusColor',
})
export class StatusColorPipe implements PipeTransform {
  transform(value: Status['name'] | undefined): any {
    switch (value) {
      case 'TO DO':
      case 'To Do':
        return '#4A5465';
      case 'IN PROGRESS':
      case 'In Progress':
        return '#f39c12';
      case 'DONE':
      case 'Done':
        return '#2ECC71';
      default:
        return '#4A5465';
    }
  }
}
