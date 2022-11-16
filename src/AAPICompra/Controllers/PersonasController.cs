using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AAPICompra.Models;
using Microsoft.AspNetCore.Authorization;

namespace AAPICompra.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PersonasController : ControllerBase
    {
        private readonly CarroCompraContext _context;

        public PersonasController(CarroCompraContext context)
        {
            _context = context;
        }

        // GET: api/Personas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Persona>>> GetPersonas()
        {
            return await _context.Personas.ToListAsync();
        }

        // GET: api/Personas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Persona>> GetPersona(int id)
        {
            var persona = await _context.Personas.FindAsync(id);

            if (persona == null)
            {
                return NotFound();
            }

            return persona;
        }

        // PUT: api/Personas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPersona(int id, Persona persona)
        {
            try
            {
                if (id != persona.IdPersona)
                {
                    return BadRequest();
                }
                //_context.Update(mascota);//esto solo se utiliza cuando se va a actualizar todo el objeto

                var personaItem = await _context.Personas.FindAsync(id);

                if (personaItem == null)
                {
                    return NotFound();
                }

                personaItem.Nombres = persona.Nombres; 
                personaItem.Apellidos = persona.Apellidos;
                personaItem.Email = persona.Email; 
                personaItem.Telefono = persona.Telefono;
                personaItem.Domicilio1 = persona.Domicilio1;
                personaItem.DomicilioT = persona.DomicilioT;

                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    

        // POST: api/Personas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Persona>> PostPersona(Persona persona)
        {
            _context.Personas.Add(persona);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPersona", new { id = persona.IdPersona }, persona);
        }

        // DELETE: api/Personas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePersona(int id)
        {
            var persona = await _context.Personas.FindAsync(id);
            if (persona == null)
            {
                return NotFound();
            }

            _context.Personas.Remove(persona);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PersonaExists(int id)
        {
            return _context.Personas.Any(e => e.IdPersona == id);
        }
    }
}
