//package com.example.ass2.repository;
//
//import com.example.ass2.model.Registration;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import java.util.List;
//
//public interface RegistrationRepository extends JpaRepository<Registration, Long> {
//    // Custom query methods (if needed)
//    List<Registration> findByAthleteId(Long athleteId);
//
//}

package com.example.ass2.repository;

import com.example.ass2.model.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    List<Registration> findByStatus(String status);
    List<Registration> findByEventIdAndStatus(Long eventId, String status);
    List<Registration> findByAthleteId(Long athleteId);
}
