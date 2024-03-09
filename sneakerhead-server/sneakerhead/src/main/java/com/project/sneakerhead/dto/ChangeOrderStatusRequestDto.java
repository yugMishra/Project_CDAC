package com.project.sneakerhead.dto;

public class ChangeOrderStatusRequestDto {
    private String status;

    public ChangeOrderStatusRequestDto() {
    }

    public ChangeOrderStatusRequestDto(String status) {
        this.status = status;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "ChangeOrderStatusRequestDto{" +
                "status='" + status + '\'' +
                '}';
    }
}
