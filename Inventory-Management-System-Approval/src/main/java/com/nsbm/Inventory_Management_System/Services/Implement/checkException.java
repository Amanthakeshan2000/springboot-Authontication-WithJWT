package com.nsbm.Inventory_Management_System.Services.Implement;

import com.nsbm.Inventory_Management_System.Exception.InventoryException;

public class checkException {
    public void checkInventory(int stock) {
        if (stock <= 0) {
            throw new InventoryException("Insufficient stock", 1001);
        }
    }
}
