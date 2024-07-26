import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function PrivateRoute({ children }) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/");
  }

  return children;
}

export default PrivateRoute;
