import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem } from '@mui/material';

const formatDate = (date) => {
    const d = new Date(date);
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
};

function AddBudgetDialog({ open, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        type: '',
        amount: '',
        date: formatDate(new Date()),
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = () => {
        onSubmit(formData);
        setFormData({
            name: '',
            category: '',
            type: '',
            amount: '',
            date: formatDate(new Date()), // Reset to today's date
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Budget Item</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    name="name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <TextField
                    margin="dense"
                    label="Category"
                    name="category"
                    select
                    fullWidth
                    variant="outlined"
                    value={formData.category}
                    onChange={handleChange}
                    required
                >
                    {['Food', 'Gas', 'Electricity', 'Rent', 'Income'].map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    margin="dense"
                    label="Type"
                    name="type"
                    select
                    fullWidth
                    variant="outlined"
                    value={formData.type}
                    onChange={handleChange}
                    required
                >
                    {['Income', 'Expense', 'Savings'].map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    margin="dense"
                    label="Amount"
                    name="amount"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleFormSubmit} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddBudgetDialog;
