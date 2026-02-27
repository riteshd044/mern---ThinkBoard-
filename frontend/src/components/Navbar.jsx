import { Link } from "react-router";
import { LoaderCircleIcon, LogOutIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import useAuthStore from "../store/useAuthStore";

const Navbar = () => {
  const logout = useAuthStore((state) => state.logout);
  const authUser = useAuthStore((state) => state.authUser);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (error) {
      console.log("Error logging out:", error);
      toast.error(error.response?.data?.message || "Failed to log out");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="text-3xl font-bold text-primary font-mono tracking-tight">
            ThinkBoard
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-sm font-semibold">
                {authUser?.fullName
                  ? authUser.fullName.charAt(0).toUpperCase() + authUser.fullName.slice(1)
                  : ""}
              </span>
              <span className="text-xs text-base-content/60">{authUser?.email}</span>
            </div>
            <Link to={"/create"} className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>
            <button className="btn btn-ghost" onClick={handleLogout} disabled={loggingOut}>
              {loggingOut ? (
                <LoaderCircleIcon className="size-5 animate-spin" />
              ) : (
                <LogOutIcon className="size-5" />
              )}
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
