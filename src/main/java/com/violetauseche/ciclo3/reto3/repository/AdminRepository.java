/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.violetauseche.ciclo3.reto3.repository;

/**
 *
 * @author mavi0
 */
import com.violetauseche.ciclo3.reto3.repository.crud.AdminCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import com.violetauseche.ciclo3.reto3.model.Admin;

@Repository
public class AdminRepository {

    @Autowired
    private AdminCrudRepository adminCrudRepository;

    public List<Admin> getAll() {
        return (List<Admin>) adminCrudRepository.findAll();
    }

    public Optional<Admin> getAdmin(int id) {
        return adminCrudRepository.findById(id);
    }

    public Admin save(Admin c) {
        return adminCrudRepository.save(c);
    }
}
