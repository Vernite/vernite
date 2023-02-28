import { NgModule } from '@angular/core';
import { UIIconComponent } from './components/icon/icon.component';
import { UIButtonDirective } from './directives/button/button.directive';

const components = [UIButtonDirective, UIIconComponent];

@NgModule({
  imports: [...components],
  exports: [...components],
})
export class UIModule {}
