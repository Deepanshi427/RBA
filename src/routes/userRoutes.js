const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const rbac = require("../middlewares/rbac");
const dynamicRateLimit = require("../middlewares/dynamicRateLimit");
const overrideAccess = require("../middlewares/overrideAccess");
const checkRole = require("../middlewares/checkRole");

const globalLimiter = dynamicRateLimit({ windowMs: 60000, max: 10 });
const strictLimiter = dynamicRateLimit({ windowMs: 60000, max: 5 });

// Apply global limiter to all routes
router.use(globalLimiter);

// -------------------- ADMIN ONLY --------------------
router.get(
  "/admin-data",
  auth,
  rbac(["admin"]),
  strictLimiter,
  (req, res) => {
    res.json({ message: "Admin route accessed" });
  }
);

router.get(
  "/admin",
  auth,
  checkRole(["admin"]),
  (req, res) => {
    res.json({ message: "Welcome Admin" });
  }
);

// -------------------- ADMIN + MANAGER --------------------
router.post(
  "/manage-user",
  auth,
  rbac(["admin", "manager"]),
  strictLimiter,
  (req, res) => {
    res.json({ message: "Manager or Admin can create/update users" });
  }
);

router.put(
  "/update/:id",
  auth,
  overrideAccess(["admin", "manager"]),
  (req, res) => {
    res.json({ message: `User ${req.params.id} updated successfully` });
  }
);

// -------------------- ALL ROLES --------------------
router.get(
  "/user-profile",
  auth,
  rbac(["admin", "manager", "user"]),
  (req, res) => {
    res.json({ message: "User profile accessed" });
  }
);

router.get(
  "/profile",
  auth,
  checkRole(["user", "admin"]),
  (req, res) => {
    res.json({ message: "Profile visible" });
  }
);

// -------------------- DELETE USER --------------------
router.delete(
  "/delete/:id",
  auth,
  overrideAccess(["admin"]),
  (req, res) => {
    res.json({ message: `User ${req.params.id} deleted successfully` });
  }
);

module.exports = router;
