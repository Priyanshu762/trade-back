const UserModel = require("./model");
const TransactionModel = require("./transaction");

//Controller function to create a new User
const userRegister = async (req, res) => {
  try {
    const { name, email, password, balance } = req.body;

    const isExisting__user = await UserModel.findOne({ email: email });
    if (isExisting__user) {
      return res.json({
        error: "User already exists",
        data: "Nothing to show",
      });
    } else {
      const newUser = await UserModel.create({
        name,
        email,
        password,
        balance,
      });
      newUser.save();

      return res.status(200).json({
        success: "Registeration Successful",
        data: "Nothing to show",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "An unexpected error encountered",
      data: error,
    });
  }
};

//Controller function to login a User
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isExisting__user = await UserModel.findOne({ email: email });
    if (!isExisting__user) {
      return res.status(606).json({
        error: "User does not exists",
        data: "Success",
      });
    }

    if (password !== isExisting__user.password) {
      return res.json({
        error: "Email or password incorrect",
        data: "Nothing to show",
      });
    }

    return res.status(200).json({
      success: "Login Successful",
      data: isExisting__user,
    });
  } catch (error) {
    return res.status(500).json({
      error: "An unexpected error encountered",
      data: error,
    });
  }
};

//Controller function to get all Users
const allUsers = async (req, res) => {
  try {
    const areExisting__users = await UserModel.find();
    const UserList = areExisting__users;
    return res.status(200).json(
      // areExisting__users
      {
        success: "Users found successfully",
        data: UserList,
      }
    );
  } catch (error) {
    return res.status(500).json({
      error: "An unexpected error encountered",
      data: error,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { email } = req.params;
    const isExisting__user = await UserModel.findOne({ email: email });
    if (!isExisting__user) {
      return res.status(404).json({
        error: "User does not exists",
        data: "Success",
      });
    }
    await UserModel.deleteOne({ email: email });
    return res.status(200).json({
      success: "User deleted successfully",
      data: "Success",
    });
  } catch (error) {
    return res.status(500).json({
      error: "An unexpected error encountered",
      data: error,
    });
  }
};

// Export the controller functions

// Controller function to create a new transaction
const createTransaction = async (req, res) => {
  try {
    const {selectedStocks,email,prices,quantity,totalPrice } = req.body;
    // console.log("accepted");
    // Calculate total price based on share price and quantity
    // const calculatedTotalPrice = sharePrice * quantity;

    // Create a new transaction
    const newTransaction = await TransactionModel.create({
      selectedStocks,
      email,
      quantity,
      prices,
      totalPrice
    });

    // Save the transaction to the database
    await newTransaction.save();

    res.status(201).json({ success: true, data: newTransaction });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Controller function to get all transactions
const getAllTransactions = async (req, res) => {
  try {
    // Retrieve all transactions from the database
    const transactions = await Transaction.find();

    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    console.error("Error getting transactions:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  userRegister,
  userLogin,
  allUsers,
  deleteUser,
  createTransaction,
  getAllTransactions,
};
