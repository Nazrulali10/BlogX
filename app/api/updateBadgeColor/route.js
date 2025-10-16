
import connectDB from '@/lib/mongoose';
import User from '@/models/User';

export  async function POST(Request) {
  

  await connectDB();

  const body = await Request.json()
  const {id, badgecolor} = body
  

  if (!id || !badgecolor) {
    return Response.json({ success: false, message: 'Missing required fields' });
  }

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { badgecolor },
      { new: true }
    );

    if (!user) {
      return Response.json({ success: false, message: 'User not found' });
    }

    return Response.json({ success: true, user });
  } catch (error) {
    console.error('Error updating badge color:', error);
    return Response.json({ success: false, message: 'Server error' });
  }
}
