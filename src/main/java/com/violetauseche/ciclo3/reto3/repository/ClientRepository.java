/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.violetauseche.ciclo3.reto3.repository;

/**
 *
 * @author mavi0
 */
import com.violetauseche.ciclo3.reto3.repository.crud.ClientCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import com.violetauseche.ciclo3.reto3.model.Client;

@Repository
public class ClientRepository {

    @Autowired
    private ClientCrudRepository clientCrudRepository;

    public List<Client> getAll() {
        return (List<Client>) clientCrudRepository.findAll();
    }

    public Optional<Client> getClient(int id) {
        return clientCrudRepository.findById(id);
    }

    public Client save(Client c) {
        return clientCrudRepository.save(c);
    }
}
