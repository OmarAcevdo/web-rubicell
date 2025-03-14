package com.backend.rubicell.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.backend.rubicell.model.entities.Usuario;

public interface UsuarioRepository extends CrudRepository<Usuario, Long>{
    
    Optional<Usuario> findByUsername(String username);

}
