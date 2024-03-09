package com.project.sneakerhead.dto;

import org.springframework.web.multipart.MultipartFile;

public class SneakerDto {
    private String name;
    private String manufacturingDate;
    private String description;
    private double price;
    private String brand;
    private String type;
    private int stock;
    private String color;
    private String returnPolicy;
    private int size;
    private MultipartFile image;

    public SneakerDto(String name, String manufacturingDate, String description, double price, String brand, String type, int stock, String color, String returnPolicy, int size, MultipartFile image) {
        this.name = name;
        this.manufacturingDate = manufacturingDate;
        this.description = description;
        this.price = price;
        this.brand = brand;
        this.type = type;
        this.stock = stock;
        this.color = color;
        this.returnPolicy = returnPolicy;
        this.size = size;
        this.image = image;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getReturnPolicy() {
        return returnPolicy;
    }

    public void setReturnPolicy(String returnPolicy) {
        this.returnPolicy = returnPolicy;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getManufacturingDate() {
        return manufacturingDate;
    }

    public void setManufacturingDate(String manufacturingDate) {
        this.manufacturingDate = manufacturingDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public MultipartFile getImage() {
        return image;
    }

    public void setImage(MultipartFile image) {
        this.image = image;
    }

    @Override
    public String toString() {
        return "ProductDto{" +
                "name='" + name + '\'' +
                ", manufacturingDate='" + manufacturingDate + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
                ", brand='" + brand + '\'' +
                ", type='" + type + '\'' +
                ", stock=" + stock +
                ", color='" + color + '\'' +
                ", returnPolicy='" + returnPolicy + '\'' +
                ", size=" + size +
                ", image=" + image +
                '}';
    }
}
