package com.nsbm.Inventory_Management_System.Services.Implement;

import com.nsbm.Inventory_Management_System.Dto.ApprovalDTO;
import com.nsbm.Inventory_Management_System.Model.Approval;
import com.nsbm.Inventory_Management_System.Repository.ApprovalRepository;
import com.nsbm.Inventory_Management_System.Services.ApprovalServices;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ApprovalServiceImpl implements ApprovalServices {

    @Autowired
    private ApprovalRepository approvalRepository;

    @Autowired
    private ModelMapper modelMapper;

    //getAllApprovals
    @Override
    public List<Approval> getAllApprovals() {
        return approvalRepository.findAll();
    }

    //saveApproval
    @Override
    public ApprovalDTO saveApproval(ApprovalDTO approvalDTO){
        approvalRepository.save(modelMapper.map(approvalDTO, Approval.class));
        return approvalDTO;
    }

    //deleteApproval By Id
    @Override
    public void deleteApproval(Long id){
        approvalRepository.deleteById(id);
    }

    //updateApproval By Id
    @Override
    public ApprovalDTO updateApproval(long id, ApprovalDTO approvalDTO) {
        Optional<Approval> RequestOptional = approvalRepository.findById(id);
        if (RequestOptional.isPresent()) {
            Approval approval = RequestOptional.get();

            // Updating fields based on the DTO input
            approval.setApproval_id(approvalDTO.getApproval_Id().intValue());
            approval.setApproval_name(approvalDTO.getApproval_Name());
            approval.setCreate_date(approvalDTO.getCreate_Date());
            approval.setStatus(approvalDTO.getStatus());

            // Saving the updated entity
            approvalRepository.save(approval);

            // Returning the updated object mapped to DTO
            return modelMapper.map(approval, ApprovalDTO.class);
        } else {
            throw new EntityNotFoundException("Approval not found with id: " + id);
        }
    }

    //getApprovalById
    @Override
    public ApprovalDTO getApprovalById(long id) {
        Optional<Approval> approvalOptional = approvalRepository.findById(id);
        if (approvalOptional.isPresent()) {
            // Map Approval entity to DTO
            return modelMapper.map(approvalOptional.get(), ApprovalDTO.class);
        } else {
            throw new EntityNotFoundException("Approval not found with id: " + id);
        }
    }


    // Get a single approval by ID
    @Override
    public Approval getApprovalByAId(long id) {
        Optional<Approval> approvalOptional = approvalRepository.getApprovalByAId(id);
        if (approvalOptional.isPresent()) {
            return approvalOptional.get();
        } else {
            throw new EntityNotFoundException("Approval not found with id: " + id);
        }
    }

    // Get approval by Approval Id
    @Override
    public List<Approval> getApprovalByApprovalId(int approvalId) {
        return approvalRepository.getApprovalByApprovalId(approvalId);
    }

    // Get approval by Status
    @Override
    public List<Approval> getApprovalByStatus(String status) {
        return approvalRepository.getApprovalByStatus(status);
    }

    // Get approval Status by Approval_Id
    public int updateApprovalByApprovalId(String status, int approvalId) {
        return approvalRepository.updateApprovalByApprovalId(status,approvalId);
    }
}
