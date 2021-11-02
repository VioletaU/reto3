/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.violetauseche.ciclo3.reto3.repository;

/**
 *
 * @author mavi0
 */
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.violetauseche.ciclo3.reto3.model.Reservation;
import com.violetauseche.ciclo3.reto3.repository.crud.ReservationCrudRepository;
import com.violetauseche.ciclo3.reto3.model.Client;
import com.violetauseche.ciclo3.reto3.reports.ContadorClients;

import java.util.List;
import java.util.Optional;
import java.util.ArrayList;
import java.util.Date;

@Repository
public class ReservationRepository {

    @Autowired
    private ReservationCrudRepository reservationCrudRepository;

    public List<Reservation> getAll() {
        return (List<Reservation>) reservationCrudRepository.findAll();
    }

    public Optional<Reservation> getReservation(int id) {
        return reservationCrudRepository.findById(id);
    }

    public Reservation save(Reservation r) {
        return reservationCrudRepository.save(r);
    }

    public void delete(Reservation reservation) {
        reservationCrudRepository.delete(reservation);
    }

    public List<Reservation> ReservacionStatusRepositorio(String status) {
        return reservationCrudRepository.findAllByStatus(status);
    }

    public List<Reservation> ReservacionTiempoRepositorio(Date a, Date b) {
        return reservationCrudRepository.findAllByStartDateAfterAndStartDateBefore(a, b);

    }

    public List<ContadorClients> getClientesRepositorio() {
        List<ContadorClients> res = new ArrayList<>();
        List<Object[]> report = reservationCrudRepository.countTotalReservationsByClient();
        for (int i = 0; i < report.size(); i++) {
            res.add(new ContadorClients((Long) report.get(i)[1], (Client) report.get(i)[0]));
        }
        return res;
   }
}
