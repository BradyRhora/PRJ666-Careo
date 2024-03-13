const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({    
    address: {
        type: String,
        required: true
    },
    apartment: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    postal_code: {
        type: String,
        required: true
    },
});

export const Address = mongoose.models?.Address || mongoose.model('Address', addressSchema);