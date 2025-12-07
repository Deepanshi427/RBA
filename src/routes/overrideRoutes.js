const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const overrideAccess = require("../middlewares/overrideAccess");

router.get(
    "/secret-admin",
    auth,
    overrideAccess(["admin"]),
    (req ,res) =>{
        res.json({message:"You accessed secret admin route"});
    }
);

router.get(
    "/manager-zone",
    auth,
    overrideAccess(["manager"]),
    (req, res)=>{
        res.json({message:"Manager zone accessed"});
    }
);

module.exports = router;