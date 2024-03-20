// Order model

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let orderSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }],
    address: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    billing_address: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: false
    },
    order_date: {
        type: Date,
        default: Date.now
    },
    payment_method: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "processing"
    }
});

export const Order = mongoose.models?.Order || mongoose.model('Order', orderSchema, 'Orders');

// Accepts an order id
export const getOrderById = async function(id) {
  try {
    const order = await Order.findById(id).lean();
    return order;
  } catch(err) {
    throw new Error("Could not find order ID.");
  }
}

