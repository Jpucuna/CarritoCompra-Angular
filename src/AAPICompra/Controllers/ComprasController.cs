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
    
    [Route("api/[controller]")]
    [ApiController]
    public class ComprasController : ControllerBase
    {
        private readonly CarroCompraContext _context;

        public ComprasController(CarroCompraContext context)
        {
            _context = context;
        }

        // GET: api/Compras
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Compra>>> GetCompras()
        {
            return await _context.Compras.ToListAsync();
        }

        // GET: api/Compras/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Compra>> GetCompra(int id)
        {
            var compra = await (from d1 in _context.Compras
                               where d1.IdPersona == id
                               select d1).ToListAsync();

            if (compra == null)
            {
                return NotFound();
            }

            return Ok(compra);
        }


        [HttpGet("UltimaCompra/{id}")]
        public async Task<ActionResult<Compra>> GetUltimaCompra(int id)
        {
            var compra = await _context.Compras.Where(d => d.IdPersona == id)
                .OrderByDescending(x => x.IdCompra).Take(1).ToListAsync();
               

            if (compra == null)
            {
                return NotFound();
            }

            return Ok(compra);
        }

        // PUT: api/Compras/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompra(int id, Compra compra)
        {
            if (id != compra.IdCompra)
            {
                return BadRequest();
            }

            _context.Entry(compra).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompraExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Compras
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Compra>> PostCompra(Compra compra)
        {
            _context.Compras.Add(compra);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCompra", new { id = compra.IdCompra }, compra);
        }

        // DELETE: api/Compras/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompra(int id)
        {
            var compra = await _context.Compras.FindAsync(id);
            if (compra == null)
            {
                return NotFound();
            }

            _context.Compras.Remove(compra);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CompraExists(int id)
        {
            return _context.Compras.Any(e => e.IdCompra == id);
        }
    }
}
