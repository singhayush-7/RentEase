import express from 'express'
import { updateUser,getUserListings ,getUser} from '../controller/usercontroller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { deleteUser } from '../controller/usercontroller.js';

const router=express.Router();
// router.get('/', (req, res) => {
//   res.send('Backend is working!');
// });

 router.post('/update/:id', verifyToken, updateUser)
  router. delete('/delete/:id', verifyToken, deleteUser)
  router.get('/listings/:id',verifyToken,getUserListings)
  router.get('/:id',verifyToken,getUser)
export default router;    