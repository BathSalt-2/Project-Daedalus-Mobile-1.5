import { NgModule } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { LoadingComponent } from './loading/loading.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  imports: [
    NativeScriptCommonModule
  ],
  declarations: [
    LoadingComponent,
    ErrorComponent
  ],
  exports: [
    LoadingComponent,
    ErrorComponent
  ]
})
export class SharedModule {}