package com.project.sneakerhead.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JoinColumn(name = "cart_id")
    private List<CartItem> items = new ArrayList<>();

    @OneToOne(cascade = CascadeType.ALL )
    @JoinColumn(name = "user_id")
    private User user;

    private Double totalPrice;

    public Cart() {
    }

    public Cart(Long id, List<CartItem> items, User user, Double totalPrice) {
        this.id = id;
        this.items = items;
        this.user = user;
        this.totalPrice = totalPrice;
    }

    public Cart(List<CartItem> items, User user, double price) {
        this.items = items;
        this.user = user;
        this.totalPrice = price;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<CartItem> getItems() {
        return items;
    }

    public void setItems(List<CartItem> items) {
        this.items = items;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    @Override
    public String toString() {
        return "Cart{" +
                "id=" + id +
                ", items=" + items +
                ", user=" + user +
                ", totalPrice=" + totalPrice +
                '}';
    }
}
