import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserModule } from '@angular/platform-browser';
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

/**
 * Main module configuration object
 */
const ngModuleConfig = {
  imports: [
    /*=============================================
    =             Local dependencies              =
    =============================================*/
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
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
    MatTooltipModule,
    MatTabsModule,

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
  ],
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
})
export class MainModule {}
