using System.Net.Http.Headers;
using System.Net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entity;
using Logica;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using pulsacionesdotnet.Models;

namespace pulsacionesdotnet.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class PersonaController : ControllerBase {
        private readonly PersonaService _personaService;
        public IConfiguration Configuration { get; }
        public PersonaController (IConfiguration configuration) {
            Configuration = configuration;
            string connectionString = Configuration["ConnectionStrings:DefaultConnection"];
            _personaService = new PersonaService (connectionString);
        }
        // GET: api/Persona
        [HttpGet]
        public IEnumerable<PersonaViewModel> Gets () {
            var personas = _personaService.ConsultarTodos ().Select (p => new PersonaViewModel (p));
            return personas;
        }

        // GET: api/Persona/5
        [HttpGet ("{identificacion}")]
        public ActionResult<PersonaViewModel> Get (string identificacion) {
            var persona = _personaService.BuscarxIdentificacion (identificacion);
            if (persona == null) return NotFound ();
            var personaViewModel = new PersonaViewModel (persona);
            return personaViewModel;
        }
        // POST: api/Persona
        [HttpPost]
        public ActionResult<PersonaViewModel> Post (PersonaInputModel personaInput) {
            Persona persona = MapearPersona (personaInput);
            var response = _personaService.Guardar (persona);
            if (response.Error) {
                ModelState.AddModelError("Guardar Persona",response.Mensaje);
                var problemDetails = new ValidationProblemDetails(ModelState){
                    Status = StatusCodes.Status400BadRequest,
                };
                return BadRequest (problemDetails);
            }
            return Ok (response.Persona);
        }
        // DELETE: api/Persona/5
        [HttpDelete ("{identificacion}")]
        public ActionResult<string> Delete (string identificacion) {
            string mensaje = _personaService.Eliminar (identificacion);
            return Ok (mensaje);
        }
        private Persona MapearPersona (PersonaInputModel personaInput) {
            var persona = new Persona {
                Identificacion = personaInput.Identificacion,
                Nombre = personaInput.Nombre,
                Edad = personaInput.Edad,
                Sexo = personaInput.Sexo
            };
            return persona;
        }
        // PUT: api/Persona/5
        [HttpPut ("{identificacion}")]
        public ActionResult<string> Put (string identificacion, PersonaUpdateModel personaUpdate) {
            var id = _personaService.BuscarxIdentificacion (identificacion);
            if (id == null) {
                return BadRequest ("No encontrado");
            }
            Persona persona = MapearPersonaUpdate(personaUpdate,identificacion);
            var mensaje = _personaService.Modificar(persona);
            return Ok(mensaje);
        }
        private Persona MapearPersonaUpdate (PersonaUpdateModel personaUpdate, string identificacion) {

            var persona = new Persona 
            {
                Identificacion = identificacion,
                Nombre = personaUpdate.Nombre,
                Edad = personaUpdate.Edad,
                Sexo = personaUpdate.Sexo
            };
            return persona;
        }
    }
}