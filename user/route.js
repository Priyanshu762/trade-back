const express = require('express');
const { userRegister, userLogin, allUsers, deleteUser,createTransaction, getAllTransactions, } = require('./controller');
// const Transaction{} = require('./transaction');
const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
router.get("/all", allUsers)
router.delete("/:email",deleteUser)
router.post('/transactions',createTransaction );
router.get('/transactions',getAllTransactions );



module.exports = router;