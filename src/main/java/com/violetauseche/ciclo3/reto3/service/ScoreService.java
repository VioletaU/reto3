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
import com.violetauseche.ciclo3.reto3.model.Score;
import com.violetauseche.ciclo3.reto3.repository.ScoreRepository;

@Service
public class ScoreService {

    @Autowired
    private ScoreRepository scoreRepository;

    public List<Score> getAll() {
        return (List<Score>) scoreRepository.getAll();
    }

    public Optional<Score> getScore(int id) {
        return scoreRepository.getScore(id);
    }

    public Score save(Score r) {
        if (r.getId() == null) {
            return scoreRepository.save(r);
        } else {
            Optional<Score> paux = scoreRepository.getScore(r.getId());
            if (paux.isEmpty()) {
                return scoreRepository.save(r);
            } else {
                return r;
            }
        }
    }
    public List<Score> delete(int id) {
        return scoreRepository.delete(id);
    }

    public Score update(Score r) {
        if (r.getId() == null) {
            return scoreRepository.update(r);
        } else {
            Optional<Score> paux = scoreRepository.getScore(r.getId());
            if (paux.isEmpty()) {
                return scoreRepository.update(r);
            } else {
                return r;
            }
        }
    }
}
