using System;
using System.Collections.Generic;

namespace AAPICompra.Models
{
    public partial class DetalleCompra
    {
        public int IdCompra { get; set; }
        public int IdProducto { get; set; }
        public int? Cantidad { get; set; }
    }
}
