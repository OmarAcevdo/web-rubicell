package com.backend.rubicell.model.dto;

import com.stripe.model.Product;

import lombok.Getter;

@Getter
public class RequestDto {
    Product[] items;
    String customerName;
    String customerEmail;
    Long[] quantities;
}
