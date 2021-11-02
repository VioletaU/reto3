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
import com.violetauseche.ciclo3.reto3.model.Reservation;
import com.violetauseche.ciclo3.reto3.reports.ContadorClients;
import com.violetauseche.ciclo3.reto3.reports.StatusReservation;
import com.violetauseche.ciclo3.reto3.repository.ReservationRepository;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> getAll() {
        return (List<Reservation>) reservationRepository.getAll();
    }

    public Optional<Reservation> getReservation(int id) {
        return reservationRepository.getReservation(id);
    }

    public Reservation save(Reservation r) {
        if (r.getIdReservation() == null) {
            return reservationRepository.save(r);
        } else {
            Optional<Reservation> paux = reservationRepository.getReservation(r.getIdReservation());
            if (paux.isEmpty()) {
                return reservationRepository.save(r);
            } else {
                return r;
            }
        }
    }

    public Reservation update(Reservation reservation) {
        if (reservation.getIdReservation() != null) {
            Optional<Reservation> evt = reservationRepository.getReservation(reservation.getIdReservation());
            if (!evt.isEmpty()) {

                if (reservation.getStartDate() != null) {
                    evt.get().setStartDate(reservation.getStartDate());
                }
                if (reservation.getDevolutionDate() != null) {
                    evt.get().setDevolutionDate(reservation.getDevolutionDate());
                }
                if (reservation.getStatus() != null) {
                    evt.get().setStatus(reservation.getStatus());
                }
                if (reservation.getScore() != null) {
                    evt.get().setScore(reservation.getScore());
                }
                if (reservation.getCabin() != null) {
                    evt.get().setCabin(reservation.getCabin());
                }
                if (reservation.getClient() != null) {
                    evt.get().setClient(reservation.getClient());
                }
                reservationRepository.save(evt.get());
                return evt.get();
            } else {
                return reservation;
            }
        } else {
            return reservation;
        }
    }

    public boolean delete(int idReservation) {
        Boolean result = getReservation(idReservation).map(reservation -> {
            reservationRepository.delete(reservation);
            return true;
        }).orElse(false);
        return result;
    }

    public StatusReservation reporteStatusServicio() {
        List<Reservation> completed = reservationRepository.ReservacionStatusRepositorio("completed");
        List<Reservation> cancelled = reservationRepository.ReservacionStatusRepositorio("cancelled");

        return new StatusReservation(completed.size(), cancelled.size());
    }

    public List<Reservation> reporteTiempoServicio(String datoA, String datoB) {
        SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd");

        Date datoUno = new Date();
        Date datoDos = new Date();

        try {
            datoUno = parser.parse(datoA);
            datoDos = parser.parse(datoB);
        } catch (ParseException evt) {
            evt.printStackTrace();
        }
        if (datoUno.before(datoDos)) {
            return reservationRepository.ReservacionTiempoRepositorio(datoUno, datoDos);
        } else {
            return new ArrayList<>();

        }
    }

    public List<ContadorClients> reporteClientesServicio() {
        return reservationRepository.getClientesRepositorio();
    }
}
