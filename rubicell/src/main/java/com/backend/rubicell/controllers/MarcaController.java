package com.backend.rubicell.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.rubicell.model.entities.Marca;
import com.backend.rubicell.repositories.MarcaRepository;

@RestController
@RequestMapping("api/v1/marcas")
public class MarcaController {
    
    @Autowired
    private MarcaRepository marcaRepository;


    @GetMapping
    public List<Marca> obtenerMarcas (){
        return marcaRepository.findAll();
    }
}
