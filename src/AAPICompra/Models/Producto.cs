using System;
using System.Collections.Generic;

namespace AAPICompra.Models
{
    public partial class Producto
    {
        public int? IdProducto { get; set; }
        public string NombreProducto { get; set; } = null!;
        public double Precio { get; set; }
        public int? Cantidad { get; set; }
        public string? Url { get; set; }
        public string? Descripcion { get; set; }
    }
}
