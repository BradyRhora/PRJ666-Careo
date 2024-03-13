import { addToUserCart } from "@/lib/models/cart";
import { createRouter} from "next-connect";
import connectDB from '@/lib/middleware/mongodb';

const handler = createRouter();
handler.use(connectDB)

// POST /api/user/cart/add
handler.post(async (req, res) => {
    const { userId, productId, quantity } = req.body;
    const cart = await addToUserCart(userId, productId, quantity);
    res.status(200).json(cart);
});

export default handler.handler({
    onError: (err, req, res) => {
      console.error(err.stack);
      res.status(err.statusCode || 500).end(err.message);
    },
  });