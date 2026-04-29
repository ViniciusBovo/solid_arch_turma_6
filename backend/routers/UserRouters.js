const router = require('express').Router()

const UserController = require('../controllers/UserController')

const verifyToken = require('../helpers/verify-token')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get("/checkUser", UserController.checkUser)
router.get("/getUser", UserController.getUserById)
router.patch("/:edit/:id", verifyToken, UserController.editUser)

module.exports = router