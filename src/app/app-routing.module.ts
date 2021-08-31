import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './guards/validar-token.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule),
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,)],

  // Opcional. {useHash: true} es para que el sistemas de rutas sea mas compatible con todos los navegadores.
  // Esto hace que cuado se despliegue en producción todas las rutas funcionen
  // esto tambien se puede arreglar desde el backend en Node
  // 
  // imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
