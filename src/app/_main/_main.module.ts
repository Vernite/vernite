import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PlatformModule } from '@angular/cdk/platform';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { InputComponent } from './components/input/input.component';
import { MatInputModule } from '@angular/material/input';
import { ValidationErrorPipe } from './pipes/validation-error.pipe';
import { ButtonComponent } from './components/button/button.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlertDialog } from './dialogs/alert/alert.dialog';
import { IconComponent } from './components/icon/icon.component';
import { FocusInitialDirective } from './directives/focus-initial.directive';
import { HttpClientModule } from '@angular/common/http';
import { DialogService } from './services/dialog.service';
import { ApiService } from './services/api.service';
import { SidebarNavigationComponent } from './components/sidebar-navigation/sidebar-navigation.component';
import { NavElementComponent } from './components/nav-element/nav-element.component';
import { RouterModule } from '@angular/router';
import { NavElementWorkspaceComponent } from './components/nav-element-workspace/nav-element-workspace.component';
import { SelectComponent } from './components/select/select.component';
import { MatSelectModule } from '@angular/material/select';
import { OptionComponent } from './components/option/option.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { TextareaComponent } from './components/textarea/textarea.component';

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
    SelectComponent,
    OptionComponent,
    MainViewComponent,
    TextareaComponent,
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
export class MainModule {}
