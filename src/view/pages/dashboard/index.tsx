import { useAuthContext } from "../../../app/hooks/use-auth.hook";
import { Button } from "../../components/button.component";

function Dashboard() {
  const { signout } = useAuthContext();
  return (
    <>
      <h1>Dashboard</h1>
      <Button onClick={signout}>Sign out</Button>
    </>
  );
}

export { Dashboard };
export default Dashboard;
