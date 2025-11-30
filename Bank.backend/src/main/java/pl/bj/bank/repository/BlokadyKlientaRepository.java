package pl.bj.bank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import  pl.bj.bank.model.BlokadyKlienta;

public interface BlokadyKlientaRepository extends JpaRepository<BlokadyKlienta, Integer> {
}
