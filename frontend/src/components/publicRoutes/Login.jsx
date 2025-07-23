import React, { useState } from "react";
import { auth } from "../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      navigate("/dashboard"); // Redirect after login
    } catch (error) {
      console.error("Login error:", error);
      
      // User-friendly error messages
      switch (error.code) {
        case "auth/invalid-email":
          toast.error("Invalid email address");
          break;
        case "auth/user-not-found":
          toast.error("No account found with this email");
          break;
        case "auth/wrong-password":
          toast.error("Incorrect password");
          break;
        default:
          toast.error("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="your@email.com"
            disabled={loading}
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="••••••••"
            minLength={6}
            disabled={loading}
          />
        </div>
        
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded text-white bg-primary hover:bg-primary-dark transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <button 
          onClick={() => navigate("/forgot-password")} 
          className="text-sm text-primary hover:underline"
        >
          Forgot password?
        </button>
      </div>
    </div>
  );
};

export default Login;