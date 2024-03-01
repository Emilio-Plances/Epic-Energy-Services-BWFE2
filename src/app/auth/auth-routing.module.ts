import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo:'/auth/login'},
  { path: 'login',component: LoginComponent, title:"EpicEnergy | Login" },
  { path: 'register', component: RegisterComponent, title:"EpicEnergy | Register"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
