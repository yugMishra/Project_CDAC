package com.nikhil.sneakerhead.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class Sneakers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String manufacturingDate;

    @Column(nullable = false)
    private String returnPolicy;

    @Column(nullable = false)
    private Integer size;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private double price;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private String color;

    @Column(nullable = false)
    private int stock;

    @Column(nullable = false)
    private String imageUrl;

    @OneToOne(cascade = CascadeType.ALL )
    @JoinColumn(name = "cart_item_id")
    @JsonIgnore
    private CartItem cartItem;

    @OneToOne(cascade = CascadeType.ALL )
    @JoinColumn(name = "order_item_id")
    @JsonIgnore
    private OrderItem orderItem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    public Sneakers() {}

    public Sneakers(Long id, String name, String manufacturingDate, String returnPolicy, Integer size, String description, double price, String brand, String type, String color, int stock, String imageUrl, CartItem cartItem, OrderItem orderItem, User user) {
        this.id = id;
        this.name = name;
        this.manufacturingDate = manufacturingDate;
        this.returnPolicy = returnPolicy;
        this.size = size;
        this.description = description;
        this.price = price;
        this.brand = brand;
        this.type = type;
        this.color = color;
        this.stock = stock;
        this.imageUrl = imageUrl;
        this.cartItem = cartItem;
        this.orderItem = orderItem;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getReturnPolicy() {
        return returnPolicy;
    }

    public void setReturnPolicy(String returnPolicy) {
        this.returnPolicy = returnPolicy;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public CartItem getCartItem() {
        return cartItem;
    }

    public void setCartItem(CartItem cartItem) {
        this.cartItem = cartItem;
    }

    public OrderItem getOrderItem() {
        return orderItem;
    }

    public void setOrderItem(OrderItem orderItem) {
        this.orderItem = orderItem;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", manufacturingDate='" + manufacturingDate + '\'' +
                ", returnPolicy='" + returnPolicy + '\'' +
                ", size=" + size +
                ", description='" + description + '\'' +
                ", price=" + price +
                ", brand='" + brand + '\'' +
                ", type='" + type + '\'' +
                ", color='" + color + '\'' +
                ", stock=" + stock +
                ", imageUrl='" + imageUrl + '\'' +
                ", cartItem=" + cartItem +
                ", orderItem=" + orderItem +
                ", user=" + user +
                '}';
    }
}
