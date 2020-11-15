import { Inject, Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Persona } from '../pulsacion/models/persona';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  baseUrl: string;
  constructor(private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService) {
    this.baseUrl = baseUrl;
  }
  get(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.baseUrl + 'api/Persona')
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Persona[]>('Consulta Persona', null))
      );
  }

  getIndivdual(identificacion:string): Observable<Persona> {
    const url = `${this.baseUrl}api/Persona/${identificacion}`; 
    return this.http.get<Persona>(url).pipe(
    tap(_ => this.handleErrorService.log(`fetched hero id=${identificacion}`)),
    catchError(this.handleErrorService.handleError<Persona>(`getHero id=${identificacion}`))
  );
  }

  post(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.baseUrl + 'api/Persona', persona)
      .pipe(
        tap(_ => this.handleErrorService.log('datos enviados')),
        catchError(this.handleErrorService.handleError<Persona>('Registrar Persona', null))
      );
  }
  put(persona: Persona): Observable<any> {
    const url = `${this.baseUrl}api/Persona/${persona.identificacion}`; 
    return this.http.put(url,persona,httpOptions).
    pipe(
      tap(_=>this.handleErrorService.log('informacion de la persona modificada correctamente')),
      catchError(this.handleErrorService.handleError<any>('Editar Persona'))
    ); 
  }
  delete(persona: Persona| string): Observable<string> {
    const id = typeof persona === 'string' ? persona : persona.identificacion;
    return this.http.delete<string>(this.baseUrl + 'api/Persona/'+id).
    pipe(
      tap(_=> this.handleErrorService.log('datos enviados')),
      catchError(this.handleErrorService.handleError<string>('Eliminar Persona', null))
    );
  }
}
