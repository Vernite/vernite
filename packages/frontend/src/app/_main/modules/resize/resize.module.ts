import { NgModule } from '@angular/core';
import { ResizeDirective } from './resize.directive';
import { ResizeHandleComponent } from './resize-handle.component';

@NgModule({
  declarations: [ResizeDirective, ResizeHandleComponent],
  exports: [ResizeDirective],
})
export class ResizeModule {}
