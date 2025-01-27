const express = require("express");
const router = express.Router();
const Grant = require("../models/Grant");

// Create a new grant
router.post("/grants", async (req, res) => {
  try {
    const grant = new Grant(req.body);
    await grant.save();
    res.status(201).send({ message: "Grant created successfully!", data: grant });
  } catch (error) {
    console.error("Error creating grant:", error);
    res.status(400).send({ message: "Failed to create grant", error });
  }
});

// Read all grants
router.get("/grants", async (req, res) => {
  try {
    const grants = await Grant.find();
    res.status(200).send(grants);
  } catch (error) {
    console.error("Error fetching grants:", error);
    res.status(500).send({ message: "Failed to fetch grants", error });
  }
});

// Read a specific grant by ID
router.get("/grants/:id", async (req, res) => {
  try {
    const grant = await Grant.findById(req.params.id);
    if (!grant) {
      return res.status(404).send({ message: "Grant not found" });
    }
    res.status(200).send(grant);
  } catch (error) {
    console.error("Error fetching grant:", error);
    res.status(500).send({ message: "Failed to fetch grant", error });
  }
});

// Update a grant by ID
router.put("/grants/:id", async (req, res) => {
  try {
    const grant = await Grant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!grant) {
      return res.status(404).send({ message: "Grant not found" });
    }
    res.status(200).send({ message: "Grant updated successfully!", data: grant });
  } catch (error) {
    console.error("Error updating grant:", error);
    res.status(400).send({ message: "Failed to update grant", error });
  }
});

// Delete a grant by ID
router.delete("/grants/:id", async (req, res) => {
  try {
    const grant = await Grant.findByIdAndDelete(req.params.id);
    if (!grant) {
      return res.status(404).send({ message: "Grant not found" });
    }
    res.status(200).send({ message: "Grant deleted successfully!" });
  } catch (error) {
    console.error("Error deleting grant:", error);
    res.status(500).send({ message: "Failed to delete grant", error });
  }
});

module.exports = router;
