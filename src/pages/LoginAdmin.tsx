import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function LoginPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
      
      if (!adminPassword) {
        setError("Admin password not configured. Please contact administrator.");
        setLoading(false);
        return;
      }

      if (password === adminPassword) {
        // Set session token
        sessionStorage.setItem("adminSession", "true");
        sessionStorage.setItem("loginTime", new Date().getTime().toString());
        navigate("/admin");
      } else {
        setError("Password salah. Silakan coba lagi.");
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Masukkan password untuk akses panel admin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Masukkan password admin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Memproses..." : "Login"}
            </Button>
          </form>

          <div className="mt-4 p-3 bg-slate-100 rounded-lg text-sm text-slate-600">
            <p className="font-medium mb-1">Info:</p>
            <p>• Password adalah key yang di-set di environment variable</p>
            <p>• Sesi akan tetap aktif selama browser belum ditutup</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
