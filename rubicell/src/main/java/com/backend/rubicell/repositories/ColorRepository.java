package com.backend.rubicell.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.rubicell.model.entities.Color;

public interface ColorRepository extends JpaRepository<Color, Long> {
    
}
