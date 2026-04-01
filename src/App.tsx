import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import LoginPage from "./pages/Loginpage";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sonner"; // ✅ use direct import

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {session ? <AppRoutes /> : <LoginPage />}
      <Toaster richColors position="top-right" /> {/* ✅ FIXED */}
    </>
  );
}