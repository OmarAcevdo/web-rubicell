package com.backend.rubicell.services;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.backend.rubicell.model.dto.ProductoDto;
import com.backend.rubicell.model.entities.Producto;


public interface ProductoService {
    List<ProductoDto> findAll();
    Optional<ProductoDto> findById(Long id);
    ProductoDto save(MultipartFile imagen, Producto producto) throws IOException;
    Optional<ProductoDto> update(Optional<MultipartFile> imagen, Producto product, Long id) throws IOException;
    ProductoDto removeById(Long id);
}
