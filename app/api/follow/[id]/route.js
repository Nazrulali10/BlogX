// import connectDB from "@/lib/mongoose";
// import Users from "@/models/User";
// import { NextResponse } from "next/server";


// export async function POST(Request, { params }) {
//   try {
//     await connectDB()
//     const { id } = params
//     const body = await Request.json()
//     const { myid } = body

//     console.log("Follow request:", { myid, id })

//     const user = await Users.findByIdAndUpdate(
//       myid,
//       { $addToSet: { following: id } }, 
//       { new: true }
//     )
//      const recieve = await Users.findByIdAndUpdate(
//       id,
//       { $addToSet: { followers: myid } }, 
//       { new: true }
//     )
//     if(!recieve){
//       return NextResponse.json({ success: false, message: 'unable to recieve' })
//     }
//     if (user) {
//       console.log("Updated user:", user)
//       return NextResponse.json({ success: true, message: 'following',user })
//     } else {
//       console.log("User not found or update failed")
//       return NextResponse.json({ success: false, message: 'unable to follow' })
//     }
//   } catch (error) {
//     console.error("Follow error:", error)
//     return NextResponse.json({ success: false, message: error.message })
//   }
// }
import connectDB from "@/lib/mongoose";
import Users from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(Request, { params }) {
  try {
    await connectDB();

    const { id } = params;                     
    const { myid } = await Request.json();     
     console.log("Follow POST received with:", { id, myid });
    if (!id || !myid) {
      return NextResponse.json({ success: false, message: "Missing user IDs." });
    }

 
    const currentUser = await Users.findById(myid);
    const targetUser = await Users.findById(id);

    if (!currentUser || !targetUser) {
      return NextResponse.json({ success: false, message: "User not found." });
    }

    
    const isFollowing = currentUser.following
      .map(userId => userId.toString())
      .includes(id.toString());

    let updatedUser;

    if (isFollowing) {
      // 🔁 Unfollow
      updatedUser = await Users.findByIdAndUpdate(
        myid,
        { $pull: { following: id } },
        { new: true }
      );

      await Users.findByIdAndUpdate(id, { $pull: { followers: myid } });

      return NextResponse.json({
        success: true,
        message: "Unfollowed",
        user: updatedUser,
      });
    } else {
      // ➕ Follow
      updatedUser = await Users.findByIdAndUpdate(
        myid,
        { $addToSet: { following: id } },
        { new: true }
      );

      await Users.findByIdAndUpdate(id, { $addToSet: { followers: myid } });

      return NextResponse.json({
        success: true,
        message: "Following",
        user: updatedUser,
      });
    }
  } catch (error) {
    console.error("Follow/Unfollow error:", error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
