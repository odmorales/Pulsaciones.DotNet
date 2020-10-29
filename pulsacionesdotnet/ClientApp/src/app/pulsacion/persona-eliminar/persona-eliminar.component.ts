import { Component, OnInit } from '@angular/core';
import { Persona } from '../models/persona';
import { PersonaService } from '../../services/persona.service';
import { stringify } from 'querystring';
import { element } from 'protractor';

@Component({
  selector: 'app-persona-eliminar',
  templateUrl: './persona-eliminar.component.html',
  styleUrls: ['./persona-eliminar.component.css']
})
export class PersonaEliminarComponent implements OnInit {

  persona: Persona;
  constructor(private personaService: PersonaService) { }
 
  ngOnInit() {
    this.persona = null;
  }
  buscarPersona(identificacion: string) {
    this.personaService.getIndivdual(identificacion).subscribe(p => {
      this.persona = p;
    });
  }
   delete() {
    this.personaService.delete(this.persona.identificacion).subscribe(p =>{
      alert("Persona eliminada");
    });
   }
}
