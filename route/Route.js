import express from 'express'
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/UserController.js'
import { getProductById, getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/ProdukController.js'
import { createSampah, getSampah, getSampahById, updateSampah, deleteSampah } from '../controllers/SampahController.js'
import {login, logout, me} from '../controllers/AuthController.js'
import { createPembukuan, deletePembukuan, getPembukuan, getPembukuanById, searchPembukuan, updatePembukuan } from '../controllers/PembukuanController.js'
import { verifyUser, adminOnly } from '../middleware/AuthUser.js'

const router = express.Router()

router.get('/rayyan', (req, res) => {
    res.json(req.query)
})

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

// Pembukuan Routing
router.get('/pembukuan', getPembukuan)
router.get('/pembukuan/filter', searchPembukuan)
router.get('/pembukuan/:id', getPembukuanById)
router.post('/pembukuan', createPembukuan)
router.put('/pembukuan/:id', updatePembukuan)
router.delete('/pembukuan/:id', deletePembukuan)


// Produk Routing
router.get('/products', verifyUser, getProducts)
router.get('/products/:id', verifyUser, getProductById)
router.post('/products', verifyUser, createProduct)
router.patch('/products/:id', verifyUser, updateProduct)
router.delete('/products/:id', verifyUser, deleteProduct)

// Sampah Routing
router.get('/sampah', verifyUser, getSampah)
router.get('/sampah/:id', verifyUser, getSampahById)
router.post('/sampah', verifyUser, createSampah)
router.patch('/sampah/:id', verifyUser, updateSampah)
router.delete('/sampah/:id', verifyUser, deleteSampah)

// Ongkir Routing


export default router