package com.nsbm.Inventory_Management_System.Dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data

//ApprovalDTO
public class ApprovalDTO {

    private Long Approval_Id;
    private String Approval_Name;
    private LocalDateTime Create_Date;
    private String Status;

}
