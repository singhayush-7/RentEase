import express from 'express'
import {createListing} from '../controller/listingcontroller.js'
import {verifyToken} from '../utils/verifyUser.js'
import { deleteListing,updateListing,getListing,getListings} from '../controller/listingcontroller.js';
const router=express.Router();
router.post('/create',verifyToken,createListing)
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);
router.get('/get/:id', getListing);
router.get('/get', getListings);
export default router;