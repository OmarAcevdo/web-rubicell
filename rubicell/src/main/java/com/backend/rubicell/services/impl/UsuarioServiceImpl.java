package com.backend.rubicell.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.rubicell.model.IUsuario;
import com.backend.rubicell.model.dto.UsuarioDto;
import com.backend.rubicell.model.dto.mapper.DtoMapperUsuario;
import com.backend.rubicell.model.entities.Rol;
import com.backend.rubicell.model.entities.Usuario;
import com.backend.rubicell.model.request.UsuarioRequest;
import com.backend.rubicell.repositories.RolRepository;
import com.backend.rubicell.repositories.UsuarioRepository;
import com.backend.rubicell.services.UsuarioService;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional(readOnly = true)
    public List<UsuarioDto> findAll() {
        List<Usuario> usuarios = (List<Usuario>) repository.findAll();

        return usuarios
                .stream()
                .map(u -> DtoMapperUsuario.builder().setUser(u).build())
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<UsuarioDto> findById(Long id) {
        return repository.findById(id).map(u -> DtoMapperUsuario.builder().setUser(u).build());
    }

    @Override
    @Transactional
    public UsuarioDto save(Usuario usuario) {

        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));

        usuario.setRoles(getRoles(usuario));

        return DtoMapperUsuario.builder().setUser(repository.save(usuario)).build();
    }

    @Override
    @Transactional
    public Optional<UsuarioDto> update(UsuarioRequest usuario, Long id) {
        Optional<Usuario> o = repository.findById(id);
        Usuario u = null;
        if (o.isPresent()) {

            Usuario usuarioDb = o.orElseThrow();
            usuarioDb.setRoles(getRoles(usuario));
            usuarioDb.setUsername(usuario.getUsername());
            usuarioDb.setEmail(usuario.getEmail());
            u = repository.save(usuarioDb);
        }
        return Optional.ofNullable(DtoMapperUsuario.builder().setUser(u).build());
    }

    @Override
    @Transactional
    public void remove(Long id) {
        repository.deleteById(id);
    }

    private List<Rol> getRoles(IUsuario usuario) {
        Optional<Rol> ou = rolRepository.findByName("ROLE_USUARIO");
        List<Rol> roles = new ArrayList<>();

        if (ou.isPresent()) {
            roles.add(ou.orElseThrow());
        }

        if (usuario.isAdmin()) {
            Optional<Rol> oa = rolRepository.findByName("ROLE_ADMIN");
            if (oa.isPresent()) {
                roles.add(oa.orElseThrow());
            }
        }

        return roles;
    }

}
