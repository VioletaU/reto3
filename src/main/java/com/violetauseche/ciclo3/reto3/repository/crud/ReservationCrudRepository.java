/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.violetauseche.ciclo3.reto3.repository.crud;

/**
 *
 * @author mavi0
 */
import com.violetauseche.ciclo3.reto3.model.Reservation;
import org.springframework.data.repository.CrudRepository;

public interface ReservationCrudRepository extends CrudRepository<Reservation, Integer> {
}