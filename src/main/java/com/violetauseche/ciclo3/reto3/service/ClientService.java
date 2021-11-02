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
import com.violetauseche.ciclo3.reto3.model.Client;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;
import com.violetauseche.ciclo3.reto3.repository.ClientRepository;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public List<Client> getAll() {
        return (List<Client>) clientRepository.getAll();
    }

    public Optional<Client> getClient(int id) {
        return clientRepository.getClient(id);
    }

    public Client save(Client c) {
        if (c.getIdClient() == null) {
            return clientRepository.save(c);
        } else {
            Optional<Client> paux = clientRepository.getClient(c.getIdClient());
            if (paux.isEmpty()) {
                return clientRepository.save(c);
            } else {
                return c;
            }
        }
    }

    public Client update(Client client){
        if(client.getIdClient()!=null){
            Optional<Client> evt = clientRepository.getClient(client.getIdClient());
            if(!evt.isEmpty()){
                if(client.getEmail()!=null){
                    evt.get().setEmail(client.getEmail());
                }
                if(client.getName()!=null){
                    evt.get().setName(client.getName());
                }
                if(client.getAge()!=null){
                    evt.get().setAge(client.getAge());
                }
                if(client.getPassword()!=null){
                    evt.get().setPassword(client.getPassword());
                }
                clientRepository.save(evt.get());
                return evt.get();
            }else{
                return client;
            }
        }else{
            return client;
        }
    }

    public boolean delete(int idClient) {
        Boolean result = getClient(idClient).map(client -> {
            clientRepository.delete(client);
            return true;
        }).orElse(false);
        return result;
    }
}
