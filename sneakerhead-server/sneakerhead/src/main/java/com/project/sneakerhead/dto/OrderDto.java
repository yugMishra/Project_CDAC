package com.project.sneakerhead.dto;


import java.util.List;

public class OrderDto {
    private List<OrderItemDto> orderDtoList;

    public OrderDto(List<OrderItemDto> orderDtoList) {
        this.orderDtoList = orderDtoList;
    }

    public List<OrderItemDto> getOrderDtoList() {
        return orderDtoList;
    }

    public void setOrderDtoList(List<OrderItemDto> orderDtoList) {
        this.orderDtoList = orderDtoList;
    }

    @Override
    public String toString() {
        return "OrderDto{" +
                "orderDtoList=" + orderDtoList +
                '}';
    }
}
