package com.backend.rubicell.services;

import net.sf.jasperreports.engine.JRException;
import java.util.List;

import com.backend.rubicell.model.dto.ProductoDto;
import com.backend.rubicell.model.dto.UsuarioDto;


public interface ReporteService {
    byte[] obtenerReporteUsuario(List<UsuarioDto> usuarios, String formato) throws JRException;
    byte[] obtenerReporteProducto(List<ProductoDto> productos, String formato) throws JRException;
}
