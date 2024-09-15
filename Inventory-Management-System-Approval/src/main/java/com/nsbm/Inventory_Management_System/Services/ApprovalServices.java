package com.nsbm.Inventory_Management_System.Services;

import com.nsbm.Inventory_Management_System.Dto.ApprovalDTO;
import com.nsbm.Inventory_Management_System.Model.Approval;

import java.time.LocalDateTime;
import java.util.List;

public interface ApprovalServices {
    // Method to get Approval by Id

    ApprovalDTO getApprovalById(long id);

    // Method to update Approval by Id
    ApprovalDTO updateApproval(long id, ApprovalDTO approvalDTO);

    // Method to save Approval
    ApprovalDTO saveApproval(ApprovalDTO approvalDTO);

    // Method to get all Approvals
    List<Approval> getAllApprovals();

    // Method to delete Approval by Id
    void deleteApproval(Long id);

    // Custom query methods
    Approval getApprovalByAId(long id);

    //Approval getApprovalByApprovalId(int approvalId);
    List<Approval> getApprovalByApprovalId(int approvalId);

    //Approval getApprovalStatusId(String status);
    List<Approval> getApprovalByStatus(String approvalId);

    int updateApprovalByApprovalId(String status, int approvalId);

}
