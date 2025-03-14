package com.backend.rubicell.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.rubicell.services.ProductoService;
import com.backend.rubicell.services.ReporteService;
import com.backend.rubicell.services.UsuarioService;

import net.sf.jasperreports.engine.JRException;


@RestController
@RequestMapping("/api/v1/reportes")
@CrossOrigin(origins = "http://localhost:5173/")
public class ReporteController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private ProductoService productoService;


    @Autowired
    ReporteService reporteService;

    @GetMapping("/usuario-reporte/{formato}")
    public ResponseEntity<ByteArrayResource> obtenerReporteUsuario(@PathVariable String formato)
            throws JRException, IOException {

        byte[] contenidoReporte = reporteService.obtenerReporteUsuario(usuarioService.findAll(), formato);

        ByteArrayResource resource = new ByteArrayResource(contenidoReporte);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .contentLength(resource.contentLength())
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        ContentDisposition.attachment().filename("usuario-reporte." + formato).build().toString())
                .body(resource);
    }

    @GetMapping("/producto-reporte/{formato}")
    public ResponseEntity<ByteArrayResource> obtenerReporteProducto(@PathVariable String formato)
            throws JRException, IOException {

        byte[] contenidoReporte = reporteService.obtenerReporteProducto(productoService.findAll(), formato);

        ByteArrayResource resource = new ByteArrayResource(contenidoReporte);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .contentLength(resource.contentLength())
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        ContentDisposition.attachment().filename("producto-reporte." + formato).build().toString())
                .body(resource);
    }

}
