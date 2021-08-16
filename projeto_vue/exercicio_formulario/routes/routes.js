var express = require("express")
var app = express();
var router = express.Router();
// importando controllers
var HomeController = require("../controllers/HomeController");
var userController = require("../controllers/user_controller");

// importando middleware

var AdminAuth = require("../middleware/adminAuth");


router.get('/', HomeController.index);
router.post('/user',userController.create);
router.get('/user', AdminAuth, userController.index);
router.get('/user/:id', AdminAuth, userController.buscaUser);
router.put("/user", AdminAuth, userController.editUser);
router.delete('/user/:id', AdminAuth, userController.remove);
router.post('/recoverpassword',  userController.recoverPassword);
router.post('/changepassword', userController.changepassword);
router.post('/login', userController.login);
router.post("/validate", AdminAuth, HomeController.validate)

module.exports = router;