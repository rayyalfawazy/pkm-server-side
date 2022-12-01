import express from 'express'
import { createUser, getUsers } from '../controllers/UserController.js'
import { getProductById, getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/ProdukController.js'
import { createSampah, getSampah, getSampahById, updateSampah } from '../controllers/SampahController.js'

const router = express.Router()

// User Routing
router.get('/users', getUsers)
router.post('/users', createUser)

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
router.delete('/sampah/:id', updateSampah)

export default router