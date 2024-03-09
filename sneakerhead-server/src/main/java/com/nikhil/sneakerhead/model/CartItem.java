package com.nikhil.sneakerhead.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer quantity;

    @OneToOne(cascade = CascadeType.DETACH )
    @JoinColumn(name = "sneakers_id")
    private Sneakers sneakers;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id", nullable = false)
    @JsonIgnore
    private Cart cart;

    public CartItem() {
    }

    public CartItem(Long id, Integer quantity, Sneakers sneakers) {
        this.id = id;
        this.quantity = quantity;
        this.sneakers = sneakers;
    }

    public CartItem(Sneakers sneakers, Integer quantity) {
        this.quantity = quantity;
        this.sneakers = sneakers;
    }

    public CartItem(Sneakers sneakers, Cart cart, Integer quantity) {
        this.sneakers = sneakers;
        this.cart = cart;
        this.quantity = quantity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Sneakers getProduct() {
        return sneakers;
    }

    public void setProduct(Sneakers sneakers) {
        this.sneakers = sneakers;
    }

    @Override
    public String toString() {
        return "CartItem{" +
                "id=" + id +
                ", quantity=" + quantity +
                ", product=" + sneakers +
                '}';
    }
}
