import express from 'express'
import { createUser, getUsers, loginUser } from '../controllers/UserController.js'
import { getProductById, getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/ProdukController.js'
import { createSampah, getSampah, getSampahById, updateSampah, deleteSampah } from '../controllers/SampahController.js'
import { verifyToken } from '../middleware/VerifyToken.js'
import { refreshToken } from '../controllers/RefreshToken.js'

const router = express.Router()

// User Routing
router.get('/users', verifyToken ,getUsers)
router.post('/users/register', createUser)
router.post('/users/login', loginUser)
router.get('/users/token', refreshToken)

// Produk Routing
router.get('/products', getProducts)
router.get('/products/:id', getProductById)
router.post('/products', createProduct)
router.put('/products/:id', updateProduct)
router.delete('/products/:id', deleteProduct)

// Sampah Routing
router.get('/sampah', getSampah)
router.get('/sampah/:id', getSampahById)
router.post('/sampah', createSampah)
router.put('/sampah/:id', updateSampah)
router.delete('/sampah/:id', deleteSampah)

// Ongkir Routing


export default router