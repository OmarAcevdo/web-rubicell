package com.backend.rubicell.model.dto.mapper;

import com.backend.rubicell.model.dto.UsuarioDto;
import com.backend.rubicell.model.entities.Usuario;

public class DtoMapperUsuario {
    
    private Usuario usuario;

    private DtoMapperUsuario(){

    }

    public static DtoMapperUsuario builder(){
        return new DtoMapperUsuario();
    }
    
    public DtoMapperUsuario setUser(Usuario usuario){
        this.usuario = usuario;
        return this;
    }

    public UsuarioDto build(){
        if(usuario == null){
            throw new RuntimeException("Debe pasar el entity Usuario");
        }
        boolean isAdmin = usuario.getRoles().stream().anyMatch(r -> "ROLE_ADMIN".equals(r.getName()));
        return new UsuarioDto(usuario.getId(), usuario.getUsername(), usuario.getEmail(), isAdmin);
    }

}
