const express = require('express');
const UserController = require('../controllers/UserController')
const ProdukController = require('../controllers/ProdukController.js')
const SampahController = require('../controllers/SampahController.js')
const AuthController = require('../controllers/AuthController.js')
const PembukuanController = require('../controllers/PembukuanController.js')
const AuthUserMiddleware = require('../middleware/AuthUser.js');
const { request } = require('express');

const router = express.Router()

router.get('/', (req, res) => {
    res.json({'message':'API Bank Sampah Anggur'})
})

// User Routing
router.get('/users', AuthUserMiddleware.verifyUser, AuthUserMiddleware.adminOnly ,UserController.getUsers)
router.get('/users/:id', AuthUserMiddleware.verifyUser ,UserController.getUserById)
router.post('/users' ,UserController.createUser)
router.put('/users/:id', AuthUserMiddleware.verifyUser ,UserController.updateUser)
router.delete('/users/:id', AuthUserMiddleware.verifyUser ,UserController.deleteUser)

// Auth Routing
router.get('/me', AuthController.me)
router.post('/login', AuthController.login)
router.delete('/logout', AuthController.logout)

// Pembukuan Routing
router.get('/pembukuan', AuthUserMiddleware.verifyUser, PembukuanController.getPembukuan)
router.get('/pembukuan/filter', AuthUserMiddleware.verifyUser, PembukuanController.searchPembukuan)
router.get('/pembukuan/:id', AuthUserMiddleware.verifyUser, PembukuanController.getPembukuanById)
router.post('/pembukuan', AuthUserMiddleware.verifyUser, PembukuanController.createPembukuan)
router.put('/pembukuan/:id', AuthUserMiddleware.verifyUser, PembukuanController.updatePembukuan)
router.delete('/pembukuan/:id', AuthUserMiddleware.verifyUser, PembukuanController.deletePembukuan)



// Produk Routing
router.get('/home/products', ProdukController.getProductsPrelogin)
router.get('/products', AuthUserMiddleware.verifyUser, ProdukController.getProducts)
router.get('/products/:id', AuthUserMiddleware.verifyUser, ProdukController.getProductById)
router.post('/products', AuthUserMiddleware.verifyUser, ProdukController.createProduct)
router.patch('/products/:id', AuthUserMiddleware.verifyUser, ProdukController.updateProduct)
router.delete('/products/:id', AuthUserMiddleware.verifyUser, ProdukController.deleteProduct)

// Sampah Routing
router.get('/home/sampah', SampahController.getSampahPrelogin)
router.get('/sampah', AuthUserMiddleware.verifyUser, SampahController.getSampah)
router.get('/sampah/:id', AuthUserMiddleware.verifyUser, SampahController.getSampahById)
router.post('/sampah', AuthUserMiddleware.verifyUser, SampahController.createSampah)
router.patch('/sampah/:id', AuthUserMiddleware.verifyUser, SampahController.updateSampah)
router.delete('/sampah/:id', AuthUserMiddleware.verifyUser, SampahController.deleteSampah)

// Ongkir Routing

module.exports = router