package com.backend.rubicell.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.rubicell.model.entities.Marca;

public interface MarcaRepository extends JpaRepository<Marca, Long> {
}
