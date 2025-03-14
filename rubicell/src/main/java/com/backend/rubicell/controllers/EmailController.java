package com.backend.rubicell.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import jakarta.mail.internet.MimeMessage;


@RestController
@CrossOrigin(origins = "http://localhost:5173/")
public class EmailController {

    @Autowired
    private JavaMailSender javaMailSender;

    @PostMapping("/enviarEmail")
    public void enviarEmail(@RequestParam String sender,
                          @RequestParam String msgBody,
                          @RequestParam String subject,
                          @RequestParam MultipartFile attachment) {
        System.out.println("Va a Enviar el Email");

        try {
            MimeMessage mensaje = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mensaje, true);

            helper.setFrom(sender);
            helper.setTo("rubicellcorporation@gmail.com");
            helper.setSubject(subject);
            helper.setText(msgBody);
            helper.addAttachment(attachment.getOriginalFilename(), attachment);
            javaMailSender.send(mensaje);
            
        } catch (Exception e) {
            // Manejar la excepción, por ejemplo, devolver un mensaje de error
            e.printStackTrace();
        }
    }
}