package com.example.wheelsonrent.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.wheelsonrent.entity.RentalHistory;
import com.example.wheelsonrent.entity.User;

public interface RentalHistoryRepository extends JpaRepository<RentalHistory, Long> {
    List<RentalHistory> findByRenterId(Long renterId);

    List<RentalHistory> findByVehicleId(Long vehicleId);

    @Query("SELECT COALESCE(SUM(r.totalCost), 0) FROM RentalHistory r WHERE r.completed = true")
    double getTotalEarnings();

    List<RentalHistory> findAllByVehicleId(Long vehicleId);

    List<RentalHistory> findByRenter(User renter);
}
