import { Injectable } from '@angular/core';
import { Service } from '../../decorators/service/service.decorator';
import { environment } from '../../../../environments/environment';

/**
 * Command service - for development purposes to add commands to window object
 */
@Service()
@Injectable({
  providedIn: 'root',
})
export class CommandService {
  /** List of commands */
  private commands: string[] = [];

  /**
   * Init command service
   */
  init() {
    // help command
    this.registerCommand('help', () => {
      this.printAllCommands();
    });

    // enable socket message logs command
    this.registerCommand('enableSocketMessageLogs', () => {
      environment.logSocketMessages = true;
    });
  }

  /**
   * Register command
   * @param name name of the command
   * @param callback callback function
   */
  registerCommand(name: string, callback: () => void) {
    (window as any)[name] = callback.bind(this);
    this.commands.push(name);
  }

  /**
   * Print all commands
   */
  printAllCommands() {
    console.dir(this.commands);
  }
}
