using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AAPICompra.Models
{
    public partial class Persona
    {
        public Persona()
        {
            Compras = new HashSet<Compra>();
        }

        public int? IdPersona { get; set; }

        public string Nombres { get; set; } = null!;
        public string Apellidos { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Telefono { get; set; } = null!;
        public string Domicilio1 { get; set; } = null!;
        public string? DomicilioT { get; set; }

        public int? IdUser { get; set; }

        [JsonIgnore]
        public virtual Usuario? IdUserNavigation { get; set; }
        [JsonIgnore]
        public virtual ICollection<Compra> Compras { get; set; }
    }
}
