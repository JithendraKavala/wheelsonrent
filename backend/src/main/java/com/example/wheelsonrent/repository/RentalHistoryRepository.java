package com.example.wheelsonrent.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.wheelsonrent.dto.RentalHistoryProjection;
import com.example.wheelsonrent.entity.RentalHistory;
import com.example.wheelsonrent.entity.User;




public interface RentalHistoryRepository extends JpaRepository<RentalHistory, Long> {
    List<RentalHistory> findByRenterId(Long renterId);

    List<RentalHistory> findByVehicleId(Long vehicleId);

    @Query("SELECT COALESCE(SUM(r.totalCost), 0) FROM RentalHistory r WHERE r.completed = true")
    double getTotalEarnings();

    @Query("SELECT COALESCE(SUM(r.totalCost), 0) FROM RentalHistory r WHERE r.vehicle.owner.id = :ownerId AND r.completed = :completed")
    Double sumAmountByOwnerIdAndCompleted(@Param("ownerId") Long ownerId, @Param("completed") boolean completed);

    List<RentalHistory> findAllByVehicleId(Long vehicleId);

    List<RentalHistory> findByRenter(User user);
     @Query("""
        SELECT r
        FROM RentalHistory r
        JOIN r.vehicle v
        JOIN r.renter u
        WHERE v.owner.id = :ownerId
    """)
    Page<RentalHistoryProjection> findByOwnerId(@Param("ownerId") Long ownerId, Pageable pageable);


}
