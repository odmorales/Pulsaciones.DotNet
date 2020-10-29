import { PersonaRegistroComponent } from './pulsacion/persona-registro/persona-registro.component';
import { PersonaConsultaComponent } from './pulsacion/persona-consulta/persona-consulta.component';
import { PersonaModificarComponent } from './Pulsacion/persona-modificar/persona-modificar.component';
import { PersonaEliminarComponent } from './Pulsacion/persona-eliminar/persona-eliminar.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'personaConsulta',
    component: PersonaConsultaComponent
  },
  {
    path: 'personaRegistro',
    component: PersonaRegistroComponent
  },
  {
    path: 'personaModificar',
    component: PersonaModificarComponent
  },
  {
    path: 'personaEliminar',
    component: PersonaEliminarComponent
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
