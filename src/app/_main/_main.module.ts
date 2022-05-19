import { DragDropModule } from '@angular/cdk/drag-drop';
import { ObserversModule } from '@angular/cdk/observers';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
import { IconComponent } from './components/icon/icon.component';
import { InputComponent } from './components/input/input.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { NavElementWorkspaceComponent } from './components/nav-element-workspace/nav-element-workspace.component';
import { NavElementComponent } from './components/nav-element/nav-element.component';
import { OptionComponent } from './components/option/option.component';
import { SelectComponent } from './components/select/select.component';
import { SidebarNavigationComponent } from './components/sidebar-navigation/sidebar-navigation.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { UpperNavigationComponent } from './components/upper-navigation/upper-navigation.component';
import { AlertDialog } from './dialogs/alert/alert.dialog';
import { FocusInitialDirective } from './directives/focus-initial.directive';
import { ValidationErrorPipe } from './pipes/validation-error.pipe';
import { ApiService } from './services/api.service';
import { DialogService } from './services/dialog.service';

/**
 * Main module configuration object
 */
const ngModuleConfig = {
  imports: [
    /*=============================================
    =             Local dependencies              =
    =============================================*/
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ObserversModule,
  ],
  importExports: [
    /*=============================================
      =                Dependencies                 =
      =============================================*/
    DragDropModule,
    PlatformModule,

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
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatSelectModule,

    /*=============================================
      =              External modules               =
      =============================================*/
    FontAwesomeModule,
  ],
  declarations: [
    /*=============================================
    =         Local custom components             =
    =============================================*/
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
  ],
  providers: [DialogService, ApiService],
};

/**
 * Main dependency module with all universal components and modules declarations
 * This module is required for application to run properly
 * @example
 * ```js
 * import { MainModule } from '@app/main/main.module';
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
