/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Controller.java to edit this template
 */
package com.violetauseche.ciclo3.reto3.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import com.violetauseche.ciclo3.reto3.model.Admin;
import com.violetauseche.ciclo3.reto3.service.AdminService;

@RestController
@RequestMapping("/api/Admin")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})

public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/all")
    public List<Admin> getReservations() {
        return adminService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Admin> getReservation(@PathVariable("id") int id) {
        return adminService.getReservation(id);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Admin save(@RequestBody Admin r) {
        return adminService.save(r);
    }
    
            @DeleteMapping("/{id}")
      @ResponseStatus(HttpStatus.NO_CONTENT)
    public List<Admin> delete(@PathVariable("id") int id) {
        return adminService.delete(id);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Admin update(@RequestBody Admin r) {
        return adminService.save(r);
    }
}

