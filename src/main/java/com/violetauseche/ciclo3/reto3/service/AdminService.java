/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.violetauseche.ciclo3.reto3.service;

/**
 *
 * @author mavi0
 */
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import com.violetauseche.ciclo3.reto3.model.Admin;
import com.violetauseche.ciclo3.reto3.repository.AdminRepository;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public List<Admin> getAll() {
        return (List<Admin>) adminRepository.getAll();
    }

    public Optional<Admin> getReservation(int id) {
        return adminRepository.getAdmin(id);
    }

    public Admin save(Admin r) {
        if (r.getId() == null) {
            return adminRepository.save(r);
        } else {
            Optional<Admin> paux = adminRepository.getAdmin(r.getId());
            if (paux.isEmpty()) {
                return adminRepository.save(r);
            } else {
                return r;
            }
        }
    }
}
