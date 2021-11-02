/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.violetauseche.ciclo3.reto3.repository;

/**
 *
 * @author mavi0
 */
import com.violetauseche.ciclo3.reto3.repository.crud.ScoreCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import com.violetauseche.ciclo3.reto3.model.Score;

@Repository
public class ScoreRepository {

    @Autowired
    private ScoreCrudRepository scoreCrudRepository;

    public List<Score> getAll() {
        return (List<Score>) scoreCrudRepository.findAll();
    }

    public Optional<Score> getScore(int id) {
        return scoreCrudRepository.findById(id);
    }

    public Score save(Score r) {
        return scoreCrudRepository.save(r);
    }

    public List<Score> delete(int id) {
        scoreCrudRepository.deleteById(id);
        return getAll();
    }

    public Score update(Score r) {
        delete(r.getId());
        return scoreCrudRepository.save(r);
    }
}
