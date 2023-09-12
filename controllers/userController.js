const userModel = require('../models/users');
const base = require('./baseController');

exports.deleteMe = async (req, res, next) => {
    try {
        await userModel.findByIdAndUpdate(req.user.id, {
            active: false
        });

        res.status(204).json({
            status: 'success',
            data: null
        });


    } catch (error) {
        next(error);
    }
};

exports.getAllUsers = base.getAll(userModel);
exports.getUser = base.getOne(userModel);

// Don't update password on this 
exports.updateUser = base.updateOne(userModel);
exports.deleteUser = base.deleteOne(userModel);