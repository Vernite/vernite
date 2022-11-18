import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '@tasks/interfaces/status.interface';
import Color from 'color';

@Pipe({
  name: 'statusColor',
})
export class StatusColorPipe implements PipeTransform {
  transform(value: Status['color'] | undefined): any {
    return Color(value).rgb().string();
  }
}
