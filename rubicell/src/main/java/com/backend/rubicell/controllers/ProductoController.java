package com.backend.rubicell.controllers;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.backend.rubicell.message.ResponseMessage;
import com.backend.rubicell.model.dto.ProductoDto;
import com.backend.rubicell.model.entities.Producto;
import com.backend.rubicell.repositories.ProductoRepository;
import com.backend.rubicell.services.ProductoService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/v1/productos")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping
    public ResponseEntity<?> crear(@RequestParam("imagen") MultipartFile imagen,
            @RequestParam("modelo") String jsonObject) {
        String message = "";
        Producto response = null;

        try {
            response = objectMapper.readValue(jsonObject, Producto.class);
            ProductoDto productoGuardado = productoService.save(imagen, response);

            return ResponseEntity.status(HttpStatus.CREATED).body(productoGuardado);
        } catch (Exception e) {
            message = "Could not upload the file: " + imagen.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }

    @GetMapping
    public ResponseEntity<?> listarProductos() {
        return ResponseEntity.status(HttpStatus.OK).body(productoService.findAll());
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerProducto(@PathVariable Long id) {

        return ResponseEntity.status(HttpStatus.OK).body(productoService.findById(id));
    }

    @GetMapping("/image/{id}")
    public ResponseEntity<?> obtenerImagenProducto(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(productoRepository.findById(id).get().getData());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@RequestParam("imagen") Optional<MultipartFile> imagen, @RequestParam("modelo") String jsonObject,
            @PathVariable Long id) throws IOException {

        Producto response = objectMapper.readValue(jsonObject, Producto.class);
        
        Optional<ProductoDto> o = productoService.update(imagen, response, id);

        if (o.isPresent()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(o.get());
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> remove(@PathVariable Long id) {
        Optional<ProductoDto> producto = productoService.findById(id);
        if (producto.isPresent()) {
            return ResponseEntity.ok().body(productoService.removeById(id));
        }

        return ResponseEntity.notFound().build();
    }
}
