import { Injectable } from '@angular/core';
import { Service } from '../../decorators/service/service.decorator';
import { environment } from '../../../../environments/environment';

@Service()
@Injectable({
  providedIn: 'root',
})
export class CommandService {
  private commands: string[] = [];

  init() {
    this.registerCommand('enableSocketMessageLogs', () => {
      environment.logSocketMessages = true;
    });
  }

  registerCommand(name: string, callback: () => void) {
    (window as any)[name] = callback.bind(this);
    this.commands.push(name);
  }

  printAllCommands() {
    console.dir(this.commands);
  }
}
