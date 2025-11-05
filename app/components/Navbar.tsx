import React from "react";
import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";

const Navbar = () => {
  const { auth } = usePuterStore();

  return (
    <nav className="navbar gradient-border">
      <Link to="/">
        <p className="text-2xl font-bold text gradient">ProfileTuner.ai</p>
      </Link>
      <div className="flex items-center gap-3">
        <Link
          to="/upload"
          className="primary-button w-fit max-[600px]:text-[14px]"
        >
          Upload Resume
        </Link>
        {auth.isAuthenticated ? (
          <button
            className="primary-button w-fit max-[600px]:hidden"
            onClick={auth.signOut}
          >
            Log Out
          </button>
        ) : (
          <button className="primary-button w-fit" onClick={auth.signIn}>
            Log In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
