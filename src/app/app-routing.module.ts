import { InfoComponent } from './pages/info/info.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CacheApiComponent } from './pages/cache-api/cache-api.component';
import { SearchKeywordComponent } from './pages/search-keyword/search-keyword.component';
import { ScrollComponent } from './pages/scroll/scroll.component';
import { ThrottleComponent } from './pages/throttle/throttle.component';

const routes: Routes = [
  { path: 'info', component: InfoComponent },
  { path: 'cache-api', component: CacheApiComponent },
  { path: 'search-keyword', component: SearchKeywordComponent },
  { path: 'scroll', component: ScrollComponent },
  { path: 'throttle', component: ThrottleComponent },
  { path: '', redirectTo: 'info', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
