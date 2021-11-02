/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.violetauseche.ciclo3.reto3.repository;

/**
 *
 * @author mavi0
 */
import com.violetauseche.ciclo3.reto3.repository.crud.CabinCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import com.violetauseche.ciclo3.reto3.model.Cabin;

@Repository
public class CabinRepository {

    @Autowired
    private CabinCrudRepository cabinCrudRepository;

    public List<Cabin> getAll() {
        return (List<Cabin>) cabinCrudRepository.findAll();
    }

    public Optional<Cabin> getCabin(int id) {
        return cabinCrudRepository.findById(id);
    }

    public Cabin save(Cabin c) {
        return cabinCrudRepository.save(c);
    }

    public void delete(Cabin cabin) {
        cabinCrudRepository.delete(cabin);
    }
}
