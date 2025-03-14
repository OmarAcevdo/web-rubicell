package com.backend.rubicell.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.rubicell.model.entities.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    
}
