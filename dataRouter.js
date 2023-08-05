const express = require("express");
const router = express.Router();
const { Client, User, sequelize } = require("./db.js");
const nanoid = require("nanoid");
const { authCheck } = require("./authMiddleware");

// get Client
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
router.get("/", async (req, res) => {
  const name = req.query.name;
  const clientId = req.query.clientId;
  if (name || clientId) {
    const foundUser = await User.findOne({
      where: { clientId: clientId.trim() },
    });
    if (foundUser) {
      res.send({
        success: true,
        user: foundUser,
      });
    } else {
      res.send({
        success: false,
        message: "User not found",
      });
    }
  } else {
    res.send({ status: false, message: "No Query Provided" });
  }
});

// Create Client
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
router.post("/", authCheck, async (req, res) => {
  if (req.userAuth) {
    const { firstName, lastName, dob, status, document } = req.body;
    if (firstName && lastName && dob && status && document) {
      const createdUser = await User.create({
        clientId: nanoid(8),
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        status: status,
        download: document,
      }).catch((e) => {
        res.send({
          success: false,
          message: "Could Not save Client in DB ... Contact Admin.",
        });
      });
      if (createdUser) {
        res.send({ success: true, user: createdUser });
      } else {
        res.send({
          success: false,
          message: "DB Error, Contact Admin ...",
        });
      }
    } else {
      res.send({
        status: false,
        message: "Invalid User Schema ..., Check Client details or Contact Admin",
      });
    }
  } else {
    res.send({ success: false, message: "User Not Authorized" });
  }
});

// Edit Client
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
router.patch("/", (req, res) => {
  res.send("Update entry");
});

// Delete Client
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
router.delete("/", async (req, res) => {
  if (req.userAuth) {
    const { clientId } = req.body;
    const foundUser = await User.findOne({
      where: {
        clientId: userId,
      },
    });
    if (foundUser) {
      await User.destroy({where: {clientId: clientId},}).catch((e) => {res.send({success: false, message: "Could not remove User, DB Error, Please Contact Admin"})})
      res.send({success: true, message: "User deleted successfully"})
    } else {
      res.send({
        success: false,
        message:
          "User not found, Please check the Client ID or contact Admin ...",
      });
    }
  } else {
    res.send({
      success: false,
      message: "User Not Authorized ... Please Contact Admin",
    });
  }
  res.send("Delete entry");
});

module.exports = router;
