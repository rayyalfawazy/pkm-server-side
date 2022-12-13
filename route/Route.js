import express from 'express'
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/UserController.js'
import { getProductById, getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/ProdukController.js'
import { createSampah, getSampah, getSampahById, updateSampah, deleteSampah } from '../controllers/SampahController.js'
import {login, logout, me} from '../controllers/AuthController.js'
import { createPembukuan, deletePembukuan, getPembukuan, getPembukuanById, searchPembukuan, updatePembukuan } from '../controllers/PembukuanController.js'

const router = express.Router()

router.get('/rayyan', (req, res) => {
    res.json(req.query)
})

// User Routing
router.get('/users', getUsers)
router.get('/users/:id', getUserById)
router.post('/users', createUser)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

// Auth Routing
router.get('/me', me)
router.post('/login', login)
router.delete('/logout', logout)

// Pembukuan Routing
router.get('/pembukuan', getPembukuan)
router.get('/pembukuan/filter', searchPembukuan)
router.get('/pembukuan/:id', getPembukuanById)
router.post('/pembukuan', createPembukuan)
router.put('/pembukuan/:id', updatePembukuan)
router.delete('/pembukuan/:id', deletePembukuan)


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