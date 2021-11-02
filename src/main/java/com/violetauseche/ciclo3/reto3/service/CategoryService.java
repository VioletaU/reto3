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
import com.violetauseche.ciclo3.reto3.model.Category;
import com.violetauseche.ciclo3.reto3.repository.CategoryRepository;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAll() {
        return (List<Category>) categoryRepository.getAll();
    }

    public Optional<Category> getCategory(int id) {
        return categoryRepository.getCategory(id);
    }

    public Category save(Category c) {
        if (c.getId() == null) {
            return categoryRepository.save(c);
        } else {
            Optional<Category> paux = categoryRepository.getCategory(c.getId());
            if (paux.isEmpty()) {
                return categoryRepository.save(c);
            } else {
                return c;
            }
        }
    }

    public Category update(Category category) {
        if (category.getId() != null) {
            Optional<Category> evt = categoryRepository.getCategory(category.getId());
            if (!evt.isEmpty()) {
                if (category.getDescription() != null) {
                    evt.get().setDescription(category.getDescription());
                }
                if (category.getName() != null) {
                    evt.get().setName(category.getName());
                }
                return categoryRepository.save(evt.get());
            }
        }
        return category;
    }

    public boolean delete(int idCategory) {
        Boolean result = getCategory(idCategory).map(category -> {
            categoryRepository.delete(category);
            return true;
        }).orElse(false);
        return result;
    }
}
