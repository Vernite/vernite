import { FormGroup } from '@angular/forms';

declare global {
  interface FormGroup {
    submit(): void;
  }
}

(FormGroup as any).prototype.submit = function () {
  console.log('submit');
};

export {};
