
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import connectDB from "@/config/db";
import User from "@/models/User";

const Dashboard = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  await connectDB();
  const users = await User.find({}, "fullname email dob createdAt");

  return (
    <div className="min-h-screen bg-gray-100 p-5 ml-56">
      <h1 className="text-3xl font-bold mb-4">Welcome to the User Dashboard</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Full Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Date of Birth</th>
            <th className="border px-4 py-2">Date Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email}>
              <td className="border px-4 py-2">{user.fullname}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                {new Date(user.dob).toLocaleDateString("en-GB")}
              </td>
              <td className="border px-4 py-2">
                {new Date(user.createdAt).toLocaleDateString("en-GB")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;

