import { Link } from "react-router";

const AuthShell = ({
  title,
  subtitle,
  footerText,
  footerLinkLabel,
  footerLinkTo,
  children,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden border border-primary/20 bg-base-100/80 backdrop-blur shadow-2xl">
        <section className="hidden lg:flex flex-col justify-between p-8 bg-gradient-to-br from-base-300 via-base-200 to-base-100 border-r border-primary/10">
          <div>
            <h1 className="text-4xl font-bold font-mono text-primary">ThinkBoard</h1>
            <p className="mt-4 text-base-content/70 leading-relaxed">
              Capture ideas, structure your thinking, and keep every note in one focused place.
            </p>
          </div>
          <div className="text-sm text-base-content/60">
            Built for clear thinking and fast note workflows.
          </div>
        </section>

        <section className="p-6 sm:p-8">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            <p className="text-base-content/70 mt-2">{subtitle}</p>
            <div className="mt-8">{children}</div>
            <p className="text-sm text-base-content/60 mt-6">
              {footerText}{" "}
              <Link className="link link-primary font-semibold" to={footerLinkTo}>
                {footerLinkLabel}
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuthShell;
