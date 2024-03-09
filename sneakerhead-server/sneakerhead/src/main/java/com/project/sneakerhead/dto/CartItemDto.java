package com.project.sneakerhead.dto;

public class CartItemDto {
    private Long sneakerId;
    private Integer quantity;

    public CartItemDto(Long sneakerId, Integer quantity) {
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
        return "CartItemDto{" +
                "productId=" + sneakerId +
                ", quantity=" + quantity +
                '}';
    }
}
