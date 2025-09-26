package com.example.wheelsonrent.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.wheelsonrent.entity.ApprovalStatus;
import com.example.wheelsonrent.entity.Vehicle;
import com.example.wheelsonrent.entity.VehicleType;
import com.example.wheelsonrent.dto.VehicleShortProjection;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
        List<Vehicle> findByApprovalStatus(ApprovalStatus status);

        List<Vehicle> findByTypeAndApprovalStatus(VehicleType type, ApprovalStatus status);

        List<Vehicle> findByOwnerId(Long ownerId);

        double countByOwnerId(Long ownerId);

        double countByOwnerIdAndApprovalStatus(Long ownerId, ApprovalStatus status);

        <T> Page<T> findByApprovalStatus(ApprovalStatus status, Pageable pageable, Class<T> type);

        @Query("SELECT v FROM Vehicle v WHERE " +
                        "(:type IS NULL OR v.type = :type) AND " +
                        "(:brand IS NULL OR LOWER(v.brand) LIKE LOWER(CONCAT('%', :brand, '%'))) AND " +
                        "(:minRating IS NULL OR v.averageRating >= :minRating) AND " +
                        "(:maxPrice IS NULL OR v.rentPerHour <= :maxPrice)")
        <T> Page<T> findByFilters(
                        @Param("type") VehicleType type,
                        @Param("brand") String brand,
                        @Param("minRating") Double minRating,
                        @Param("maxPrice") Double maxPrice,
                        Pageable pageable,
                        Class<T> typeClass);

}
