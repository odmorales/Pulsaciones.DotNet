import { Component, OnInit } from '@angular/core';
import { Persona } from '../models/persona';
import { PersonaService } from '../../services/persona.service';

@Component({
  selector: 'app-persona-modificar',
  templateUrl: './persona-modificar.component.html',
  styleUrls: ['./persona-modificar.component.css']
})
export class PersonaModificarComponent implements OnInit {

  constructor(private personaService: PersonaService) { }
  persona: Persona
  ngOnInit() {
  }

  buscarPersona(identificacion: string) {
    this.personaService.getIndivdual(identificacion).subscribe(p => {
      if(p != null){
        this.persona = p;
      }
    });
  }

  update(){
    this.personaService.put(this.persona).subscribe(p => {
         alert('Registro modificado');
    });

  }

}
