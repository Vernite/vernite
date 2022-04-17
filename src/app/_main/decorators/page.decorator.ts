/**
 * Decorator to mark component or directive as a page.
 *
 * ```typescript
 * (@)Page()
 * (@)Component({
 *   selector: 'app-example-page',
 *   templateUrl: './example.page.html',
 *   styleUrls: ['./example.page.scss'],
 * })
 * export class CreateWorkspacePage { ... }
 * ```
 */
export function Page() {
  return function decorator(target: any) {};
}
