package com.nikhil.sneakerhead.dto;

public class OrderItemDto {
    private Long sneakerId;
    private Integer quantity;

    public OrderItemDto(Long sneakerId, Integer quantity) {
        this.sneakerId = sneakerId;
        this.quantity = quantity;
    }

    public Long getSneakerId() {
        return sneakerId;
    }

    public void setSneakerId(Long sneakerId) {
        this.sneakerId = sneakerId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "OrderItemDto{" +
                "sneakerId=" + sneakerId +
                ", quantity=" + quantity +
                '}';
    }
}
