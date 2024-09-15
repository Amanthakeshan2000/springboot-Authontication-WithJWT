package com.nsbm.Inventory_Management_System.Model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;



@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "Approval")

//Approval Model
public class Approval {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true)
    private int approval_id;

    @Column(nullable = true)
    private String approval_name;

    @Column(nullable = true)
    private LocalDateTime create_date;

    @Column(nullable = true)
    private String status;
}

