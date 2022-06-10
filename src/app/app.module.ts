import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { SharedMaterialModule } from './shared/shared-material.module';
import { InfoComponent } from './pages/info/info.component';
import { CacheApiComponent } from './pages/cache-api/cache-api.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchKeywordComponent } from './pages/search-keyword/search-keyword.component';

@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,
    CacheApiComponent,
    SearchKeywordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    SharedMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
