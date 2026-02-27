import { useState } from "react";
import { LockKeyholeIcon, MailIcon, UserRoundIcon } from "lucide-react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import AuthShell from "../components/AuthShell";
import useAuthStore from "../store/useAuthStore";

const SignupPage = () => {
  const signup = useAuthStore((state) => state.signup);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.password.trim()) {
      toast.error("All fields are required");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await signup({
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });
      toast.success("Account created successfully");
      navigate("/", { replace: true });
    } catch (error) {
      const message =
        error.response?.data?.message || "Unable to create account. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Create account"
      subtitle="Set up your ThinkBoard workspace in less than a minute."
      footerText="Already have an account?"
      footerLinkLabel="Sign in"
      footerLinkTo="/login"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="form-control">
          <span className="label-text mb-2 font-medium">Full name</span>
          <div className="input input-bordered flex items-center gap-2">
            <UserRoundIcon className="size-4 opacity-70" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Ritesh Das"
              autoComplete="name"
              className="grow"
              required
            />
          </div>
        </label>

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
              placeholder="At least 6 characters"
              autoComplete="new-password"
              minLength={6}
              className="grow"
              required
            />
          </div>
        </label>

        <label className="form-control">
          <span className="label-text mb-2 font-medium">Confirm password</span>
          <div className="input input-bordered flex items-center gap-2">
            <LockKeyholeIcon className="size-4 opacity-70" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              autoComplete="new-password"
              minLength={6}
              className="grow"
              required
            />
          </div>
        </label>

        <button type="submit" className="btn btn-primary w-full mt-2" disabled={loading}>
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>
    </AuthShell>
  );
};

export default SignupPage;
