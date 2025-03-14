package com.backend.rubicell.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.backend.rubicell.model.entities.Rol;

public interface RolRepository extends CrudRepository<Rol, Long> {
    Optional<Rol> findByName(String name);
}
