package com.project.sneakerhead.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
public class User {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String name;
        @Column(name = "email", unique = true)
        private String email;
        private String contactNumber;
        private String password;
        private String role;
        private String address;

        @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
        @JsonIgnore
        private List<Sneakers> sneakers = new ArrayList<>();

        @OneToOne(mappedBy = "user")
        @JsonIgnore
        private Cart cart;

        @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
        @JoinColumn(name = "user_id")
        @JsonIgnore
        private List<Orders> orders = new ArrayList<>();

        public User() {
        
        }

        public User(Long id, String name, String email, String contactNumber, String password, String role) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.contactNumber = contactNumber;
            this.password = password;
            this.role = role;
        }

    public User(Long id, String name, String email, String contactNumber, String password, String role, String address) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.contactNumber = contactNumber;
        this.password = password;
        this.role = role;
        this.address = address;
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

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getContactNumber() {
            return contactNumber;
        }

        public void setContactNumber(String contactNumber) {
            this.contactNumber = contactNumber;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", contactNumber='" + contactNumber + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                ", address='" + address + '\'' +
                '}';
    }
}

