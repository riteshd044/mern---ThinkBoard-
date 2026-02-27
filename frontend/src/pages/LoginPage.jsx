import { useState } from "react";
import { LockKeyholeIcon, MailIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import AuthShell from "../components/AuthShell";
import useAuthStore from "../store/useAuthStore";

const LoginPage = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const redirectTo = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      toast.error("Email and password are required");
      return;
    }

    setLoading(true);
    try {
      await login({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });
      toast.success("Welcome back!");
      navigate(redirectTo, { replace: true });
    } catch (error) {
      const message = error.response?.data?.message || "Unable to sign in. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Sign in"
      subtitle="Access your notes and continue where you left off."
      footerText="New to ThinkBoard?"
      footerLinkLabel="Create account"
      footerLinkTo="/singup"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="form-control">
          <span className="label-text mb-2 font-medium">Email</span>
          <div className="input input-bordered flex items-center gap-2">
            <MailIcon className="size-4 opacity-70" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              className="grow"
              required
            />
          </div>
        </label>

        <label className="form-control">
          <span className="label-text mb-2 font-medium">Password</span>
          <div className="input input-bordered flex items-center gap-2">
            <LockKeyholeIcon className="size-4 opacity-70" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              autoComplete="current-password"
              minLength={6}
              className="grow"
              required
            />
          </div>
        </label>

        <button type="submit" className="btn btn-primary w-full mt-2" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </AuthShell>
  );
};

export default LoginPage;
