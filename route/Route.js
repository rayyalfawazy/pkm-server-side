import express from 'express'
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/UserController.js'
import { getProductById, getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/ProdukController.js'
import { createSampah, getSampah, getSampahById, updateSampah, deleteSampah } from '../controllers/SampahController.js'
import {login, logout, me} from '../controllers/AuthController.js'
import { verifyUser, adminOnly } from '../middleware/AuthUser.js'

const router = express.Router()

// User Routing
router.get('/users', verifyUser, adminOnly ,getUsers)
router.get('/users/:id', verifyUser ,getUserById)
router.post('/users' ,createUser)
router.put('/users/:id', verifyUser ,updateUser)
router.delete('/users/:id', verifyUser ,deleteUser)

// Auth Routing
router.get('/me', me)
router.post('/login', login)
router.delete('/logout', logout)

// Produk Routing
router.get('/products', verifyUser, getProducts)
router.get('/products/:id', verifyUser, getProductById)
router.post('/products', verifyUser, createProduct)
router.patch('/products/:id', verifyUser, updateProduct)
router.delete('/products/:id', verifyUser, deleteProduct)

// Sampah Routing
router.get('/sampah', getSampah)
router.get('/sampah/:id', getSampahById)
router.post('/sampah', createSampah)
router.put('/sampah/:id', updateSampah)
router.delete('/sampah/:id', deleteSampah)

// Ongkir Routing


export default router