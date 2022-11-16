using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AAPICompra.Models
{
    public partial class Usuario
    {
        public Usuario()
        {
            Personas = new HashSet<Persona>();
        }

        public int IdUser { get; set; }
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string? Status { get; set; }

        [JsonIgnore]
        public virtual ICollection<Persona> Personas { get; set; }
    }
}
