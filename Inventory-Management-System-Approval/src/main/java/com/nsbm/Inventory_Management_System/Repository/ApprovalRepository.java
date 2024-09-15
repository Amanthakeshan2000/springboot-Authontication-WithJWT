package com.nsbm.Inventory_Management_System.Repository;
import com.nsbm.Inventory_Management_System.Model.Approval;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ApprovalRepository extends JpaRepository<Approval,Long> {
    List<Approval> findAll();

    // Find approval by ID, returning an Optional
    @Query("SELECT a FROM Approval a WHERE a.id = :id")
    Optional<Approval> getApprovalByAId(@Param("id") Long id);

    // Find approvals by approval_id (returns a list of entities)
    @Query("SELECT a FROM Approval a WHERE a.approval_id = :approvalId")
    List<Approval> getApprovalByApprovalId(@Param("approvalId") int approvalId);

    // Find approval by Status
    @Query("SELECT a FROM Approval a WHERE a.status = :status")
    List<Approval> getApprovalByStatus(@Param("status") String status);

    // Custom JPQL query to update Approval by approval_id
    @Modifying
    @Transactional
    @Query("UPDATE Approval a SET  a.status = :status WHERE a.approval_id = :approvalId")
    int updateApprovalByApprovalId(
            @Param("status") String status,
            @Param("approvalId") int approvalId
    );
}
