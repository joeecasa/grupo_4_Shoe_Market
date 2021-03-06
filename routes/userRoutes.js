const express = require('express')
const router = express.Router()
const path = require("path")
const multer = require("multer")


const userController = require('../controllers/UserController')
const Validations = require("../middlewares/Validations")
const guestMiddleware = require("../middlewares/GuestMiddleware")
const authMiddleware = require("../middlewares/AuthMiddleware")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/img/user"))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + req.body.nombre +"-" + Date.now() + path.extname(file.originalname))
    }
}
)




const upload = multer({storage})



// **Creación o registro de usuarios**
router.get('/registro',guestMiddleware, userController.register)
router.post('/registro',upload.single("photo"),Validations, userController.createUser ); 

// **Eliminación de usuarios**
// router.post('/borrar',userController.borrarUsuario); 

// **Logueo de usuarios**
router.get('/loginConfirm',guestMiddleware,userController.loginRegister)
router.get('/login',guestMiddleware,userController.login)
router.post("/login",userController.processLogin)


router.get("/profile",authMiddleware,userController.profile)

router.get("/logout",userController.logout)

// **Edición de usuarios**
//router.get('/editar',userController.listarUsuarios)
// router.post("/editar/:id",userController.editar)


module.exports = router