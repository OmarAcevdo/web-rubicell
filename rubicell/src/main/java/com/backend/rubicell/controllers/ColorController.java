package com.backend.rubicell.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.rubicell.model.entities.Color;
import com.backend.rubicell.repositories.ColorRepository;

@RestController
@RequestMapping("api/v1/colores")
public class ColorController {
    
    @Autowired
    private ColorRepository colorRepository;


    @GetMapping
    public List<Color> obtenerColores (){
        return colorRepository.findAll();
    }
}
