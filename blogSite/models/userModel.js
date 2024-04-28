import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const UserModel = model("UserModel", userSchema);
export default UserModel;