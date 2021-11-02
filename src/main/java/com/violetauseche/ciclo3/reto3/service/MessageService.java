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
import com.violetauseche.ciclo3.reto3.model.Message;
import com.violetauseche.ciclo3.reto3.repository.MessageRepository;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    public List<Message> getAll() {
        return (List<Message>) messageRepository.getAll();
    }

    public Optional<Message> getMessage(int id) {
        return messageRepository.getMessage(id);
    }

    public Message save(Message m) {
        if (m.getIdMessage() == null) {
            return messageRepository.save(m);
        } else {
            Optional<Message> paux = messageRepository.getMessage(m.getIdMessage());
            if (paux.isEmpty()) {
                return messageRepository.save(m);
            } else {
                return m;
            }
        }
    }

    public Message update(Message message) {
        if (message.getIdMessage() != null) {
            Optional<Message> evt = messageRepository.getMessage(message.getIdMessage());
            if (!evt.isEmpty()) {
                if (message.getMessageText() != null) {
                    evt.get().setMessageText(message.getMessageText());
                }
                if (message.getCabin() != null) {
                    evt.get().setCabin(message.getCabin());
                }
                if (message.getClient() != null) {
                    evt.get().setClient(message.getClient());
                }
                messageRepository.save(evt.get());
                return evt.get();
            } else {
                return message;
            }
        } else {
            return message;
        }
    }

    public boolean delete(int idMessage) {
        Boolean result = getMessage(idMessage).map(message -> {
            messageRepository.delete(message);
            return true;
        }).orElse(false);
        return result;
    }

}
