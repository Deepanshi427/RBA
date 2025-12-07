const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const rbac = require("../middlewares/rbac");

// Admin only
router.get("/admin-data", auth, rbac(["admin"]), (req, res) => {
    res.json({ message: "Admin route accessed" });
});

// Admin & Manager
router.post("/manage-user", auth, rbac(["admin", "manager"]), (req, res) => {
    res.json({ message: "Manager or Admin can create/update users" });
});

// All roles
router.get("/user-profile", auth, rbac(["admin", "manager", "user"]), (req, res) => {
    res.json({ message: "User profile accessed" });
});

module.exports = router;
