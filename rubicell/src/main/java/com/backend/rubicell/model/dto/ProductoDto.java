package com.backend.rubicell.model.dto;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.backend.rubicell.model.entities.Producto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProductoDto {
    private Long id;
    private String titulo;
    private String descripcion;
    private Double precio;
    private Integer stock;
    private String url_imagen;
    private String categoria;
    private String marca;
    private String color;

    public static ProductoDto desdeProducto(Producto producto) {
        String url = ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .path("/api/v1/productos/image/")
                .path(String.valueOf(producto.getId()))
                .toUriString();

        return ProductoDto.builder()
                .id(producto.getId())
                .titulo(producto.getTitulo())
                .descripcion(producto.getDescripcion())
                .precio(producto.getPrecio())
                .stock(producto.getStock())
                .url_imagen(url)
                .categoria(producto.getCategoria().getNombre())
                .marca(producto.getMarca().getNombre())
                .color(producto.getColor().getNombre())
                .build();
    }

}
