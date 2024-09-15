package com.nsbm.Inventory_Management_System.Controller;
import org.springframework.format.annotation.DateTimeFormat;
import com.nsbm.Inventory_Management_System.Dto.ApprovalDTO;
import com.nsbm.Inventory_Management_System.Model.Approval;
import com.nsbm.Inventory_Management_System.Services.Implement.ApprovalServiceImpl;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import static com.nsbm.Inventory_Management_System.Const.AppConstants.*;

@RestController
@RequestMapping(value = "api/v1/approval")
@CrossOrigin

public class ApprovalController {

    @Autowired
    private ApprovalServiceImpl approvalServiceImpl;


    //Get All Approval Details
    @GetMapping("/getApproval")
    public ResponseEntity<List<Approval>> getAllApprovel() {
        List<Approval> approval = approvalServiceImpl.getAllApprovals();
        return ResponseEntity.ok(approval);
    }

    //Add Approval Details
    @PostMapping("/saveApproval")
    public ApprovalDTO saveApproval(@RequestBody ApprovalDTO approvalDTO) {
        return approvalServiceImpl.saveApproval(approvalDTO);
    }

    //Delete Approval Details By Id
    @DeleteMapping("/deleteApproval/{id}")
    public String deleteSuplier(@PathVariable Long id) {
        approvalServiceImpl.deleteApproval(id);
        return deleteApproval;
    }

    //Update Approval Details By Id
    @PutMapping("/updateApproval/{id}")
    public ResponseEntity<ApprovalDTO> updateApproval(@PathVariable long id, @RequestBody ApprovalDTO approvalDTO) {
        try {
            ApprovalDTO updatedApproval = approvalServiceImpl.updateApproval(id, approvalDTO);
            return ResponseEntity.ok(updatedApproval);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    //Get Approval Details By Id
    @GetMapping("/{id}")
    public ResponseEntity<ApprovalDTO> getApprovalById(@PathVariable long id) {
        try {
            ApprovalDTO approvalDTO = approvalServiceImpl.getApprovalById(id);
            return ResponseEntity.ok(approvalDTO);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    //Get Approval Details By Id
    @GetMapping("/approval/{id}")
    public ResponseEntity<Approval> getApprovalByAId(@PathVariable("id") long id) {
        try {
            Approval approval = approvalServiceImpl.getApprovalByAId(id);
            return new ResponseEntity<>(approval, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    //Get Approval Details By Approval Id
    @GetMapping("/byApprovalId/{approvalId}")
    public ResponseEntity<List<Approval>> getApprovalByApprovalId(@PathVariable int approvalId) {
        List<Approval> approvals = approvalServiceImpl.getApprovalByApprovalId(approvalId);
        if (approvals.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return new ResponseEntity<>(approvals, HttpStatus.OK);
    }

    //Get Approval Details By Status
    @GetMapping("/byStatus/{status}")
    public ResponseEntity<List<Approval>> getApprovalByStatus(@PathVariable String status) {
        List<Approval> approvals = approvalServiceImpl.getApprovalByStatus(status);
        if (approvals.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return new ResponseEntity<>(approvals, HttpStatus.OK);
    }

    //Update Status By Approval_Id
    @PutMapping("/update/{approvalId}")
    public ResponseEntity<String> updateApproval(
            @PathVariable int approvalId,
            @RequestParam(defaultValue = APPROVED) String status) {

        int result = approvalServiceImpl.updateApprovalByApprovalId(status, approvalId);

        if (result > 0) {
            return new ResponseEntity<>(successfullUpdate, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(unsuccessfullUpdate, HttpStatus.BAD_REQUEST);
        }
    }

}
