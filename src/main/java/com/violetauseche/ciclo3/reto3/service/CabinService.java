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
import com.violetauseche.ciclo3.reto3.model.Cabin;
import com.violetauseche.ciclo3.reto3.repository.CabinRepository;

@Service
public class CabinService {

    @Autowired
    private CabinRepository cabinRepository;

    public List<Cabin> getAll() {
        return (List<Cabin>) cabinRepository.getAll();
    }

    public Optional<Cabin> getCabin(int id) {
        return cabinRepository.getCabin(id);
    }

    public Cabin save(Cabin r) {
        if (r.getId() == null) {
            return cabinRepository.save(r);
        } else {
            Optional<Cabin> paux = cabinRepository.getCabin(r.getId());
            if (paux.isEmpty()) {
                return cabinRepository.save(r);
            } else {
                return r;
            }
        }
    }

    public Cabin update(Cabin cabin) {
        if (cabin.getId() != null) {
            Optional<Cabin> evt = cabinRepository.getCabin(cabin.getId());
            if (!evt.isEmpty()) {
                if (cabin.getName() != null) {
                    evt.get().setName(cabin.getName());
                }
                if (cabin.getBrand() != null) {
                    evt.get().setBrand(cabin.getBrand());
                }
                if (cabin.getRooms() != null) {
                    evt.get().setRooms(cabin.getRooms());
                }
                if (cabin.getDescription() != null) {
                    evt.get().setDescription(cabin.getDescription());
                }
                if (cabin.getCategory() != null) {
                    evt.get().setCategory(cabin.getCategory());
                }
                cabinRepository.save(evt.get());
                return evt.get();
            } else {
                return cabin;
            }
        } else {
            return cabin;
        }
    }

    public boolean delete(int idCabin) {
        Boolean result = getCabin(idCabin).map(cabin -> {
            cabinRepository.delete(cabin);
            return true;
        }).orElse(false);
        return result;
    }
}
