// Set profile data for a logged-in user
import {createRouter} from 'next-connect';

import { verifyJwtToken } from "@/lib/authenticate";
import { setProfile } from '@/lib/models/user';

import connectDB from '@/lib/middleware/mongodb';

// Use router so we can use middleware
const handler = createRouter();

// Database middleware ensures we have a connection to the db established before any queries
handler.use(connectDB);

// Sets the profile data for the logged-in user in the DB
handler.post(async (req, res) => {
  const { profile } = req.body;

  try {
    const {cookies} = req;
    if (cookies.token) {
      const data = await verifyJwtToken(cookies.token);
      const id = data.payload._id;
      await setProfile(id, profile);
    } else {
      throw new Error('No token found');
    }
  }
  catch(err) {
    res.status(400).json({status: 400, message: err.message});
    return;
  }

  console.log("Set user profile data");
  res.status(200).json({status: 200});
  return;
});

export default handler.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});