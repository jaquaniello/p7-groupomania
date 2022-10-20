const express = require("express")
const router = express.Router();
const userCtrl = require("../controllers/Coms")
const auth = require("../middleware/auth");
const  upload = require("../middleware/multer-config");

router.post("/COMS",auth,upload.single("post_image"),userCtrl.COMS);
router.get('/REC',auth,userCtrl.getAllComs)

router.delete("/D/:id" ,auth,userCtrl.deleteComs) 
router.get("/:id",auth,userCtrl.getOneComs);
router.put("/P/:id",auth,upload.single("post_image"),userCtrl.updateComs);
router.post("/:id/like", auth, userCtrl.likeComs);


module.exports = router;