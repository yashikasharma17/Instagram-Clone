import express from 'express';
import { getmessages, sendmessage } from '../controller/message.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
const router=express.Router();
router.route('/send/:id').post(isAuthenticated,sendmessage);
router.route('/all/:id').get(isAuthenticated,getmessages);
export default router;