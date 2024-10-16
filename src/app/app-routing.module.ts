import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ClientiComponent } from './clienti/clienti.component';

//reindirizziamo al login
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'clienti', component: ClientiComponent}
  //{ path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
