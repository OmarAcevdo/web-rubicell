package com.backend.rubicell.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.rubicell.model.entities.Categoria;
import com.backend.rubicell.repositories.CategoriaRepository;

@RestController
@RequestMapping("api/v1/categorias")
public class CategoriaController {
    
    @Autowired
    private CategoriaRepository categoriaRepository;


    @GetMapping
    public List<Categoria> obtenerCategorias (){
        return categoriaRepository.findAll();
    }
}
