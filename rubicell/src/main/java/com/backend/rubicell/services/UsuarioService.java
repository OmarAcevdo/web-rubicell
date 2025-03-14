package com.backend.rubicell.services;

import java.util.List;
import java.util.Optional;

import com.backend.rubicell.model.dto.UsuarioDto;
import com.backend.rubicell.model.entities.Usuario;
import com.backend.rubicell.model.request.UsuarioRequest;

public interface UsuarioService {
    
    List<UsuarioDto> findAll();
    Optional<UsuarioDto> findById(Long id);
    UsuarioDto save(Usuario usuario);
    Optional<UsuarioDto> update(UsuarioRequest usuario, Long id);
    void remove(Long id);
}
