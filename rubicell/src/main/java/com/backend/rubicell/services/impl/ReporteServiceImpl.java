package com.backend.rubicell.services.impl;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import com.backend.rubicell.model.dto.ProductoDto;
import com.backend.rubicell.model.dto.UsuarioDto;
import com.backend.rubicell.services.ReporteService;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.ooxml.JRXlsxExporter;
import net.sf.jasperreports.engine.util.JRLoader;
import net.sf.jasperreports.engine.util.JRSaver;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;

@Service
public class ReporteServiceImpl implements ReporteService {

    public byte[] obtenerReporteUsuario(List<UsuarioDto> usuarios, String formato) throws JRException {

        JasperReport jasperReport;

        try {
            // Try to load the compiled report from the file system
            jasperReport = (JasperReport) JRLoader.loadObject(ResourceUtils.getFile("usuario-reporte.jasper"));
        } catch (FileNotFoundException | JRException e) {
            try {
                // If the compiled report is not found, compile the JRXML and save the compiled
                // report
                File file = ResourceUtils.getFile("classpath:usuario-reporte.jrxml");
                jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
                JRSaver.saveObject(jasperReport, "usuario-reporte.jasper");
            } catch (FileNotFoundException | JRException ex) {
                throw new RuntimeException(ex);
            }
        }

        // Set report data
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(usuarios);
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("title", "Reportes de los Usuarios");

        // Fill report
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

        // Export the filled report to the specified format
        byte[] reportContent;
        try {
            switch (formato) {
                case "pdf" -> reportContent = JasperExportManager.exportReportToPdf(jasperPrint);
                case "xml" -> reportContent = JasperExportManager.exportReportToXml(jasperPrint).getBytes();
                case "xlsx" -> reportContent = exportToExcel(jasperPrint);
                // Add more cases for other formats if needed
                default -> throw new RuntimeException("Unknown report format");
            }
        } catch (JRException e) {
            throw new RuntimeException(e);
        }

        return reportContent;
    }

    public byte[] obtenerReporteProducto(List<ProductoDto> productos, String formato) throws JRException {

        JasperReport jasperReport;

        try {
            // Try to load the compiled report from the file system
            jasperReport = (JasperReport) JRLoader.loadObject(ResourceUtils.getFile("producto-reporte.jasper"));
        } catch (FileNotFoundException | JRException e) {
            try {
                // If the compiled report is not found, compile the JRXML and save the compiled
                // report
                File file = ResourceUtils.getFile("classpath:producto-reporte.jrxml");
                jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
                JRSaver.saveObject(jasperReport, "producto-reporte.jasper");
            } catch (FileNotFoundException | JRException ex) {
                throw new RuntimeException(ex);
            }
        }

        // Set report data
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(productos);
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("title", "Reportes de los Productos");

        // Fill report
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

        // Export the filled report to the specified format
        byte[] reportContent;
        try {
            switch (formato) {
                case "pdf" -> reportContent = JasperExportManager.exportReportToPdf(jasperPrint);
                case "xml" -> reportContent = JasperExportManager.exportReportToXml(jasperPrint).getBytes();
                case "xlsx" -> reportContent = exportToExcel(jasperPrint);
                // Add more cases for other formats if needed
                default -> throw new RuntimeException("Unknown report format");
            }
        } catch (JRException e) {
            throw new RuntimeException(e);
        }

        return reportContent;
    }

    private byte[] exportToExcel(JasperPrint jasperPrint) throws JRException {
        JRXlsxExporter exporter = new JRXlsxExporter();
        byte reportContent[];
        exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(byteArrayOutputStream));
        exporter.exportReport();
        reportContent = byteArrayOutputStream.toByteArray();
        return reportContent;
    }

}
