import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppModuleShared } from './app.shared.module';
import { AppComponent } from './components/app/app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    bootstrap: [AppComponent],
    imports: [
      
        BrowserModule,
        AppModuleShared,
        FormsModule,
        ReactiveFormsModule
         
    ],
    providers: [
        { provide: 'BASE_URL', useFactory: getBaseUrl }
    ]
})
export class AppModule {
}

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}
