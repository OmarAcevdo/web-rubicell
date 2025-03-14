package com.backend.rubicell.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.rubicell.model.entities.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
    
}
