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
import com.violetauseche.ciclo3.reto3.model.Cabin;
import com.violetauseche.ciclo3.reto3.service.CabinService;

@RestController
@RequestMapping("/api/Cabin")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})

public class CabinController {

    @Autowired
    private CabinService cabinService;

    @GetMapping("/all")
    public List<Cabin> getReservations() {
        return cabinService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Cabin> getCabin(@PathVariable("id") int id) {
        return cabinService.getCabin(id);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Cabin save(@RequestBody Cabin r) {
        return cabinService.save(r);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int id) {
        return cabinService.delete(id);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Cabin update(@RequestBody Cabin r) {
        return cabinService.update(r);
    }
}
