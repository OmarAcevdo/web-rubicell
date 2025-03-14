package com.backend.rubicell.services.impl;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.backend.rubicell.model.dto.ProductoDto;
import com.backend.rubicell.model.entities.Producto;
import com.backend.rubicell.repositories.ProductoRepository;
import com.backend.rubicell.services.ProductoService;


@Service
public class ProductoServiceImpl implements ProductoService {
    
    @Autowired
    private ProductoRepository productoRepository;

    @Transactional(readOnly = true)
    @Override
    public List<ProductoDto> findAll() {

        return productoRepository.findAll().stream().map(ProductoDto::desdeProducto).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    @Override
    public Optional<ProductoDto> findById(Long id) {
        return productoRepository.findById(id).map(ProductoDto::desdeProducto);
    }

    @Transactional
    @Override
    public ProductoDto save(MultipartFile imagen, Producto producto) throws IOException {
        String imageNombre = StringUtils.cleanPath(imagen.getOriginalFilename());
        producto.setNombre_imagen(imageNombre);
        producto.setTipo_imagen(imagen.getContentType());
        producto.setData(imagen.getBytes());
        return ProductoDto.desdeProducto(productoRepository.save(producto));
    }

    @Transactional
    @Override
    public Optional<ProductoDto> update(Optional<MultipartFile> imagen, Producto producto, Long id) throws IOException {
        Optional<Producto> productoDB = productoRepository.findById(id);
        if (productoDB.isPresent()) {
            Producto existenteProducto = productoDB.get();

            // Actualizar campos de imagen si es proporcionada
            if (imagen.isPresent()) {
                try {
                    String nombreImagen = StringUtils.cleanPath(imagen.get().getOriginalFilename());
                    existenteProducto.setNombre_imagen(nombreImagen);
                    existenteProducto.setData(imagen.get().getBytes());
                    existenteProducto.setTipo_imagen(imagen.get().getContentType());
                } catch (IOException e) {
                    throw new RuntimeException("Error al manejar la imagen del producto.", e);
                }
            }

            // Actualizar otros campos del producto
            existenteProducto.setTitulo(producto.getTitulo());
            existenteProducto.setDescripcion(producto.getDescripcion());
            existenteProducto.setPrecio(producto.getPrecio());
            existenteProducto.setStock(producto.getStock());
            existenteProducto.setCategoria(producto.getCategoria());
            existenteProducto.setColor(producto.getColor());
            existenteProducto.setMarca(producto.getMarca());

            // Guardar el producto actualizado
            return Optional.of(ProductoDto.desdeProducto(productoRepository.save(existenteProducto)));
        }

        return Optional.empty();
    }

    @Transactional
    @Override
    public ProductoDto removeById(Long id) {
        Optional<Producto> op = productoRepository.findById(id);
        if (op.isPresent()) {
            productoRepository.deleteById(id);
        }
        return op.map(ProductoDto::desdeProducto).orElseThrow();
    }
}
