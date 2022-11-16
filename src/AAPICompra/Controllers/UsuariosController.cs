using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AAPICompra.Models;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace AAPICompra.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly CarroCompraContext _context;
        private IConfiguration config;
        public UsuariosController(CarroCompraContext context, IConfiguration config)
        {
            _context = context;
            this.config = config;
        }

        // GET: api/Usuarios
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuarios()
        {
            return await _context.Usuarios.ToListAsync();
        }

        [Authorize]
        // GET: api/Usuarios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);

            if (usuario == null)
            {
                return NotFound();
            }

            return usuario;
        }

        // PUT: api/Usuarios/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuario(int id, Usuario usuario)
        {
            if (id != usuario.IdUser)
            {
                return BadRequest();
            }

            _context.Entry(usuario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuarioExists(id))
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

        // POST: api/Usuarios
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Usuario>> PostUsuario(Usuario usuario)
        {
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsuario", new { id = usuario.IdUser }, usuario);
        }
        

        [HttpPost("authenticate")]
        public async Task<IActionResult?> GetUser(User user)
        {
            var admin = await _context.Usuarios.
                SingleOrDefaultAsync(x => x.Username == user.Username && x.Password == user.Password);


            if (admin is null)
            {
                return BadRequest(new { message = "Credenciales inválidas"});
            }

            var pers = await _context.Personas.SingleOrDefaultAsync(x => x.IdUser == admin.IdUser);
            string token = GenerarToken(admin);

            return Ok(new { idPersona= pers?.IdPersona ,token = token});
        }

        // DELETE: api/Usuarios/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UsuarioExists(int id)
        {
            return _context.Usuarios.Any(e => e.IdUser == id);
        }

        private string GenerarToken(Usuario user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Username),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.GetSection("JWT:Key").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var securityToken = new JwtSecurityToken(
                                claims: claims, //valores que se pasan 
                                expires: DateTime.Now.AddMinutes(60),//duracion del token 
                                signingCredentials: creds//credenciales definidas
                                );
            string token = new JwtSecurityTokenHandler().WriteToken(securityToken);
            return token;
        }
    }
}
