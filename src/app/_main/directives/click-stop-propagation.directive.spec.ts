/* tslint:disable:no-unused-variable */

import { ClickStopPropagationDirective } from './click-stop-propagation.directive';

describe('Directive: ClickStopPropagation', () => {
  it('should create an instance', () => {
    const directive = new ClickStopPropagationDirective();
    expect(directive).toBeTruthy();
  });

  it('should stop propagation', () => {
    const directive = new ClickStopPropagationDirective();
    const event = new Event('click');
    const eventStopPropagationSpy = spyOn(event, 'stopPropagation');
    directive.onClick(event);
    expect(eventStopPropagationSpy).toHaveBeenCalled();
  });
});
