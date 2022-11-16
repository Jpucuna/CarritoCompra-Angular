using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace AAPICompra.Models
{
    public partial class CarroCompraContext : DbContext
    {
        public CarroCompraContext()
        {
        }

        public CarroCompraContext(DbContextOptions<CarroCompraContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Compra> Compras { get; set; } = null!;
        public virtual DbSet<DetalleCompra> DetalleCompras { get; set; } = null!;
        public virtual DbSet<Persona> Personas { get; set; } = null!;
        public virtual DbSet<Producto> Productos { get; set; } = null!;
        public virtual DbSet<Usuario> Usuarios { get; set; } = null!;


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Compra>(entity =>
            {
                entity.HasKey(e => e.IdCompra);

                entity.ToTable("Compra");

                entity.Property(e => e.IdCompra).HasColumnName("idCompra");

                entity.Property(e => e.DomicilioEntrega)
                    .HasMaxLength(70)
                    .IsUnicode(false)
                    .HasColumnName("domicilioEntrega");

                entity.Property(e => e.FechaCompra)
                    .HasColumnType("date")
                    .HasColumnName("fechaCompra");

                entity.Property(e => e.IdPersona).HasColumnName("idPersona");

                entity.Property(e => e.Pago).HasColumnName("pago");

                entity.HasOne(d => d.IdPersonaNavigation)
                    .WithMany(p => p.Compras)
                    .HasForeignKey(d => d.IdPersona)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Compra_Persona1");
            });

            modelBuilder.Entity<DetalleCompra>(entity =>
            {
                entity.HasKey(e => new { e.IdCompra, e.IdProducto })
                    .HasName("PK_compraProductoCompra_detalleCompraID");

                entity.ToTable("detalle_compra");

                entity.Property(e => e.IdCompra).HasColumnName("idCompra");

                entity.Property(e => e.IdProducto).HasColumnName("idProducto");

                entity.Property(e => e.Cantidad)
                    .HasColumnName("cantidad")
                    .HasDefaultValueSql("((0))");
            });

            modelBuilder.Entity<Persona>(entity =>
            {
                entity.HasKey(e => e.IdPersona);

                entity.ToTable("Persona");

                entity.Property(e => e.IdPersona).HasColumnName("idPersona");

                entity.Property(e => e.Apellidos)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("apellidos");

                entity.Property(e => e.Domicilio1)
                    .HasMaxLength(70)
                    .IsUnicode(false)
                    .HasColumnName("domicilio1");

                entity.Property(e => e.DomicilioT)
                    .HasMaxLength(70)
                    .IsUnicode(false)
                    .HasColumnName("domicilioT");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.IdUser).HasColumnName("idUser");

                entity.Property(e => e.Nombres)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombres");

                entity.Property(e => e.Telefono)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("telefono");

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.Personas)
                    .HasForeignKey(d => d.IdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Persona_Usuario");
            });

            modelBuilder.Entity<Producto>(entity =>
            {
                entity.HasKey(e => e.IdProducto);

                entity.ToTable("Producto");

                entity.Property(e => e.IdProducto).HasColumnName("idProducto");

                entity.Property(e => e.Cantidad)
                    .HasColumnName("cantidad")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Descripcion)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("descripcion");

                entity.Property(e => e.NombreProducto)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombreProducto");

                entity.Property(e => e.Precio).HasColumnName("precio");

                entity.Property(e => e.Url)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("url");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.IdUser);

                entity.ToTable("Usuario");

                entity.Property(e => e.IdUser).HasColumnName("idUser");

                entity.Property(e => e.Password)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("password");

                entity.Property(e => e.Status)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .HasColumnName("status")
                    .HasDefaultValueSql("('A')");

                entity.Property(e => e.Username)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("username");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
