using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AAPICompra.Models
{
    public partial class Compra
    {
        public int? IdCompra { get; set; }
        public int IdPersona { get; set; }
        public DateTime FechaCompra { get; set; }
        public double Pago { get; set; }
        public string DomicilioEntrega { get; set; } = null!;

        [JsonIgnore]
        public virtual Persona? IdPersonaNavigation { get; set; } 
    }
}
