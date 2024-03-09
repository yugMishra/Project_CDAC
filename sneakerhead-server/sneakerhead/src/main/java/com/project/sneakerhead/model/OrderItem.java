package com.project.sneakerhead.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer quantity;
    private String status="Pending Dispatch";

    @OneToOne(cascade = CascadeType.ALL )
    @JoinColumn(name = "sneakers_id")
    private Sneakers sneakers;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "orders_id", nullable = false)
    @JsonIgnore
    private Orders orders;

    public OrderItem() {
    }

    public OrderItem(Long id, Integer quantity, Sneakers sneakers) {
        this.id = id;
        this.quantity = quantity;
        this.sneakers = sneakers;
    }

    public OrderItem(Long id, Integer quantity, String status, Sneakers sneakers, Orders orders) {
        this.id = id;
        this.quantity = quantity;
        this.status = status;
        this.sneakers = sneakers;
        this.orders = orders;
    }

    public OrderItem(Sneakers sneakers, Integer quantity, Orders orders) {
        this.sneakers = sneakers;
        this.quantity = quantity;
        this.orders = orders;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "OrderItem{" +
                "id=" + id +
                ", quantity=" + quantity +
                ", status='" + status + '\'' +
                ", sneakers=" + sneakers +
                ", orders=" + orders +
                '}';
    }
}
