const inventoryModel = require('../models/inventoryModel');

exports.getAllInventory = async (req, res) => {
    try {
        const inventory = await inventoryModel.getInventory();
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getInventory = async (req, res) => {
    try {
        const inventory = await inventoryModel.getInventoryById(req.params.id);
        if (inventory) {
            res.json(inventory);
        } else {
            res.status(404).json({ message: 'Inventory not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createInventory = async (req, res) => {
    try {
        const newInventory = await inventoryModel.createInventory(req.body);
        res.status(201).json(newInventory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateInventory = async (req, res) => {
    try {
        const updatedInventory = await inventoryModel.updateInventory(req.params.id, req.body);
        res.json(updatedInventory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteInventory = async (req, res) => {
    try {
        const deletedInventory = await inventoryModel.deleteInventory(req.params.id);
        res.json(deletedInventory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};