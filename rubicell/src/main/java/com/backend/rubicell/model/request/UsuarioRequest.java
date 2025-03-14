package com.backend.rubicell.model.request;

import com.backend.rubicell.model.IUsuario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class UsuarioRequest implements IUsuario{
    
    @NotBlank
    @Size(min = 4, max = 10)
    private String username;

    @NotEmpty
    @Email
    private String email;
    
    private boolean admin;

}
