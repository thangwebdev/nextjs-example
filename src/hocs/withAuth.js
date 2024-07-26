import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function withAuth(Component) {
  const Auth = (props) => {
    if (!cookies().get("token")?.value) {
      redirect("/");
    }

    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
}

export default withAuth;
