package com.nsbm.Inventory_Management_System.Exception;

public class InventoryException extends RuntimeException{
    private int errorCode;
    public InventoryException(String message, int errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public int getErrorCode() {
        return errorCode;
    }
    @Override
    public String toString() {
        return "InventoryException{" +
                "errorCode=" + errorCode +
                ", message=" + getMessage() +
                '}';
    }
}
