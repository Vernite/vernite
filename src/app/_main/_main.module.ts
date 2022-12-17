import { DragDropModule } from '@angular/cdk/drag-drop';
import { ObserversModule } from '@angular/cdk/observers';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DialogOutletComponent } from './components/dialog-outlet/dialog-outlet.component';
import { FiltersComponent } from './components/filters/filters.component';
import { IconComponent } from './components/icon/icon.component';
import { DatePickerComponent } from './components/input-date-time/date-picker/date-picker.component';
import { InputDateTimeComponent } from './components/input-date-time/input-date-time.component';
import { InputComponent } from './components/input/input.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { NavElementWorkspaceComponent } from './components/nav-element-workspace/nav-element-workspace.component';
import { NavElementComponent } from './components/nav-element/nav-element.component';
import { EmptyOptionsComponent } from './components/select/empty-options/empty-options.component';
import { OptionComponent } from './components/select/option/option.component';
import { SelectComponent } from './components/select/select.component';
import { SidebarNavigationComponent } from './components/sidebar-navigation/sidebar-navigation.component';
import { SnackbarOutletComponent } from './components/snackbar-outlet/snackbar-outlet.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { UpperNavigationComponent } from './components/upper-navigation/upper-navigation.component';
import { AlertDialog } from './dialogs/alert/alert.dialog';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation/click-stop-propagation.directive';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { MockPage } from './pages/mock/mock.page';
import { DayjsPipe } from './pipes/dayjs/dayjs.pipe';
import { DateByPreferencesPipe } from './pipes/date-by-preferences/date-by-preferences.pipe';
import { DayOfWeekPipe } from './pipes/day-of-week/day-of-week.pipe';
import { DayjsFormatPipe } from './pipes/dayjs-format/dayjs-format.pipe';
import { MonthPipe } from './pipes/month/month.pipe';
import { ValidationErrorPipe } from './pipes/validation-error/validation-error.pipe';
import { YearPipe } from './pipes/year/year.pipe';
import { ApiService } from './services/api/api.service';
import { DialogService } from './services/dialog/dialog.service';
import { LetDirective } from './directives/let/let.directive';
import { ViewContainerDirective } from './directives/view-container/view-container.directive';
import { FocusInitialDirective } from './directives/focus-initial/focus-initial.directive';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabComponent } from './components/tabs/tab/tab.component';
import { InputColorComponent } from './components/input-color/input-color.component';
import { ColorComponent } from './components/color/color.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ContrastColorPipe } from './pipes/contrast-color/contrast-color.pipe';
import { DateTimePickerComponent } from './components/input-date-time/date-time-picker/date-time-picker.component';
import { TimePickerComponent } from './components/input-date-time/time-picker/time-picker.component';
import { SidebarEntryComponent } from './components/sidebar-navigation/sidebar-entry/sidebar-entry.component';
import { ColorPipe } from './pipes/color/color.pipe';
import { PillComponent } from './components/pill/pill.component';
import { ClickOutsideDirective } from './directives/click-outside/click-outside.directive';
import { InputFileComponent } from './components/input-file/input-file.component';
import { MarkdownPipe } from './pipes/markdown/markdown.pipe';
import { SidebarGroupComponent } from './components/sidebar-navigation/sidebar-group/sidebar-group.component';
import { ReversePipe } from './pipes/reverse/reverse.pipe';
import { CollapsableDirective } from './directives/collapsable/collapsable.directive';
import { ResizeModule } from './modules/resize/resize.module';

/**
 * Main module configuration object
 */
const ngModuleConfig = {
  imports: [
    /*=============================================
    =             Local dependencies              =
    =============================================*/
    CommonModule,
    RouterModule,
  ],
  importExports: [
    /*=============================================
      =                Dependencies                 =
      =============================================*/
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule,
    PlatformModule,
    OverlayModule,
    ObserversModule,

    /*=============================================
      =              Material modules               =
      =============================================*/
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    ResizeModule,

    /*=============================================
      =              External modules               =
      =============================================*/
    FontAwesomeModule,
  ],
  declarations: [
    /*=============================================
    =         Local custom components             =
    =============================================*/
    SidebarEntryComponent,
    SidebarGroupComponent,
  ],
  exportDeclarations: [
    /*=============================================
    =         Exported custom components          =
    =============================================*/
    InputComponent,
    ButtonComponent,
    ValidationErrorPipe,
    AlertDialog,
    IconComponent,
    FocusInitialDirective,
    SidebarNavigationComponent,
    NavElementComponent,
    NavElementWorkspaceComponent,
    UpperNavigationComponent,
    SelectComponent,
    OptionComponent,
    MainViewComponent,
    TextareaComponent,
    CheckboxComponent,
    CardComponent,
    ClickStopPropagationDirective,
    InputDateTimeComponent,
    LetDirective,
    FiltersComponent,
    SnackbarComponent,
    SnackbarOutletComponent,
    MockPage,
    DialogOutletComponent,
    ViewContainerDirective,
    EmptyOptionsComponent,
    DatePickerComponent,
    DateTimePickerComponent,
    MonthPipe,
    DayjsPipe,
    YearPipe,
    DayjsFormatPipe,
    DayOfWeekPipe,
    DayjsPipe,
    DateByPreferencesPipe,
    TabsComponent,
    TabComponent,
    InputColorComponent,
    ColorComponent,
    LoaderComponent,
    ContrastColorPipe,
    TimePickerComponent,
    PillComponent,
    ClickOutsideDirective,
    InputFileComponent,
    MarkdownPipe,
    ReversePipe,
    ColorPipe,
    CollapsableDirective,
  ],
  providers: [
    /*=============================================
    =              Local providers                =
    =============================================*/
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    MatCheckboxModule,
    MatDatepickerModule,
    /*=============================================
    =              Exported providers             =
    =============================================*/
    DialogService,
    ApiService,
  ],
};

/**
 * Main dependency module with all universal components and modules declarations
 * This module is required for application to run properly
 * @example
 * ```js
 * import { MainModule } from '@app/main/main.module';
import { TimePickerComponent } from './components/input-date-time/time-picker/time-picker.component';
 *
 * (@)NgModule({
 *   imports: [ ..., MainModule ],
 *   ...
 * })
 * export class ExampleModule {}
 * ```
 */
@NgModule({
  imports: [...ngModuleConfig.imports, ...ngModuleConfig.importExports],
  declarations: [...ngModuleConfig.declarations, ...ngModuleConfig.exportDeclarations],
  exports: [...ngModuleConfig.importExports, ...ngModuleConfig.exportDeclarations],
  providers: [...ngModuleConfig.providers],
})
export class MainModule {
  static injector: Injector;

  constructor(injector: Injector) {
    MainModule.injector = injector;
    (window as any).injector = injector;
  }
}
