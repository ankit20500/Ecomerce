const express=require("express");
const router=express.Router();

const upload=require("../middleWares/multer");
const {register, loginUser,logout,forgetPassword,resetPassword,userDetails,updatePassword,updateProfile,getAllUsers,getSingleUser,updateUserRole,removeUser} = require("../controllers/userController");
const {isAuthencationUser,authorizeRole}=require("../middleWares/authencation")


router.post("/register",register);

router.post("/login", loginUser);

router.post("/password/forget",forgetPassword);
router.put("/password/reset/:token", resetPassword);
router.post("/logout",logout);

router.get("/profile",isAuthencationUser,userDetails)
router.put("/password/update",isAuthencationUser,updatePassword)

router.put("/profile/update", isAuthencationUser, upload.fields([{ name: "avatar" }]), updateProfile);

router.get("/admin/users",isAuthencationUser, authorizeRole("admin"), getAllUsers);
router.get("/admin/user/:id",isAuthencationUser,authorizeRole("admin"),getSingleUser);

router.put("/admin/user/:id",isAuthencationUser,authorizeRole("admin"),updateUserRole);
router.delete("/admin/user/:id",isAuthencationUser,authorizeRole("admin"),removeUser);


module.exports=router;