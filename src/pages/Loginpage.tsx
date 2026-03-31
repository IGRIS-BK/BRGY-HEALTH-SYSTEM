import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate(); // ✅ ADD THIS

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    // ✅ REDIRECT TO DASHBOARD
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 to-blue-200">

      <div className="w-[900px] h-[500px] bg-white rounded-3xl shadow-2xl flex overflow-hidden">

        {/* LEFT */}
        <div className="w-1/2 p-10 flex flex-col justify-center">

          <h1 className="text-3xl font-bold mb-2">Hello!</h1>
          <p className="text-gray-500 mb-6">Sign in to your account</p>

          {/* EMAIL */}
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-3 mb-4">
            <Mail className="text-purple-600 mr-3" size={18} />
            <input
              type="email"
              placeholder="E-mail"
              className="bg-transparent outline-none flex-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-3 mb-4">
            <Lock className="text-purple-600 mr-3" size={18} />
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent outline-none flex-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-full hover:opacity-90 transition"
          >
            {loading ? "Signing in..." : "SIGN IN"}
          </button>

        </div>

        {/* RIGHT */}
        <div className="w-1/2 bg-gradient-to-br from-purple-700 to-indigo-600 text-white flex items-center justify-center">
          <h1 className="text-2xl font-bold">Welcome Back!</h1>
        </div>

      </div>
    </div>
  );
}