import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, LogOut, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface FooterData {
  id: string;
  phone: string;
  email: string;
  address: string;
  instagram: string;
  facebook: string;
  twitter: string;
  whatsapp_message_hero: string;
  whatsapp_message_cta: string;
  whatsapp_message_footer: string;
  hero_program_title: string;
  updated_at: string;
}

export function AdminPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    address: "",
    instagram: "",
    facebook: "",
    twitter: "",
    whatsapp_message_hero: "",
    whatsapp_message_cta: "",
    whatsapp_message_footer: "",
    hero_program_title: "",
  });

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        navigate("/login");
        return;
      }
    };

    checkAuth();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session?.user) {
          navigate("/login");
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, [navigate]);

  // Fetch footer data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: footerData, error: fetchError } = await supabase
          .from("footer_settings")
          .select("*")
          .limit(1)
          .single();

        if (fetchError && fetchError.code !== "PGRST116") {
          throw fetchError;
        }

        if (footerData) {
          setData(footerData as FooterData);
          setFormData({
            phone: footerData.phone || "",
            email: footerData.email || "",
            address: footerData.address || "",
            instagram: footerData.instagram || "",
            facebook: footerData.facebook || "",
            twitter: footerData.twitter || "",
            whatsapp_message_hero: footerData.whatsapp_message_hero || "",
            whatsapp_message_cta: footerData.whatsapp_message_cta || "",
            whatsapp_message_footer: footerData.whatsapp_message_footer || "",
            hero_program_title: footerData.hero_program_title || "",
          });
        } else {
          // Initialize with empty data if not exists
          setFormData({
            phone: "",
            email: "",
            address: "",
            instagram: "",
            facebook: "",
            twitter: "",
            whatsapp_message_hero: "",
            whatsapp_message_cta: "",
            whatsapp_message_footer: "",
            hero_program_title: "",
          });
        }
      } catch (err: unknown) {
        const error = err as Error;
        console.error("Error fetching data:", error);
        setError(error.message || "Gagal memuat data footer");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const now = new Date().toISOString();

      if (data?.id) {
        // Update existing
        const { error: updateError } = await supabase
          .from("footer_settings")
          .update({
            ...formData,
            updated_at: now,
          })
          .eq("id", data.id);

        if (updateError) throw updateError;
      } else {
        // Insert new
        const { error: insertError } = await supabase
          .from("footer_settings")
          .insert([
            {
              ...formData,
              updated_at: now,
            },
          ]);

        if (insertError) throw insertError;
      }

      setSuccess("Data footer berhasil disimpan!");
      
      // Refresh data
      const { data: newData } = await supabase
        .from("footer_settings")
        .select("*")
        .limit(1)
        .single();

      if (newData) {
        setData(newData as FooterData);
      }

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error saving data:", error);
      setError(error.message || "Gagal menyimpan data footer");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-slate-600 mb-4" />
            <p className="text-slate-600">Memuat data...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Admin Panel</h1>
            <p className="text-slate-600 mt-1">Kelola Konten Footer</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Alert Messages */}
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        {/* Main Form */}
        <Card>
          <CardHeader>
            <CardTitle>Pengaturan Footer</CardTitle>
            <CardDescription>
              Ubah informasi yang akan ditampilkan di footer website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-6">
              {/* Contact Info Section */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-slate-900">Informasi Kontak</h3>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Nomor WhatsApp
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="628123456789"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <p className="text-xs text-slate-500">
                    Format: 628xxxxx (gunakan format internasional)
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="info@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="address" className="text-sm font-medium">
                    Alamat
                  </label>
                  <Textarea
                    id="address"
                    name="address"
                    placeholder="Jl. Contoh No. 123, Kota, Provinsi"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
              </div>

              {/* Social Media Section */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-slate-900">Media Sosial</h3>

                <div className="space-y-2">
                  <label htmlFor="instagram" className="text-sm font-medium">
                    Instagram URL
                  </label>
                  <Input
                    id="instagram"
                    name="instagram"
                    type="url"
                    placeholder="https://instagram.com/username"
                    value={formData.instagram}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="facebook" className="text-sm font-medium">
                    Facebook URL
                  </label>
                  <Input
                    id="facebook"
                    name="facebook"
                    type="url"
                    placeholder="https://facebook.com/username"
                    value={formData.facebook}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="twitter" className="text-sm font-medium">
                    Twitter URL
                  </label>
                  <Input
                    id="twitter"
                    name="twitter"
                    type="url"
                    placeholder="https://twitter.com/username"
                    value={formData.twitter}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Hero Section */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-slate-900">Hero Section</h3>

                <div className="space-y-2">
                  <label htmlFor="hero_program_title" className="text-sm font-medium">
                    Judul Program
                  </label>
                  <Input
                    id="hero_program_title"
                    name="hero_program_title"
                    placeholder="Program Magang & PKL 2025"
                    value={formData.hero_program_title}
                    onChange={handleChange}
                  />
                  <p className="text-xs text-slate-500">
                    Teks yang ditampilkan di badge hero section
                  </p>
                </div>
              </div>

              {/* WhatsApp Messages Section */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-slate-900">Pesan WhatsApp Otomatis</h3>

                <div className="space-y-2">
                  <label htmlFor="whatsapp_message_hero" className="text-sm font-medium">
                    Pesan di Hero Section
                  </label>
                  <Textarea
                    id="whatsapp_message_hero"
                    name="whatsapp_message_hero"
                    placeholder="Halo, saya tertarik dengan program magang digital marketing"
                    value={formData.whatsapp_message_hero}
                    onChange={handleChange}
                    rows={2}
                  />
                  <p className="text-xs text-slate-500">
                    Pesan yang dikirim saat user klik "Chat WhatsApp" di bagian atas
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="whatsapp_message_cta" className="text-sm font-medium">
                    Pesan di CTA Section
                  </label>
                  <Textarea
                    id="whatsapp_message_cta"
                    name="whatsapp_message_cta"
                    placeholder="Halo, saya mau daftar program magang digital marketing"
                    value={formData.whatsapp_message_cta}
                    onChange={handleChange}
                    rows={2}
                  />
                  <p className="text-xs text-slate-500">
                    Pesan yang dikirim saat user klik "Daftar Sekarang" atau "Chat Admin"
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="whatsapp_message_footer" className="text-sm font-medium">
                    Pesan di Footer
                  </label>
                  <Textarea
                    id="whatsapp_message_footer"
                    name="whatsapp_message_footer"
                    placeholder="Halo, saya tertarik dengan program DigiMagang. Bisa informasi lebih lanjut?"
                    value={formData.whatsapp_message_footer}
                    onChange={handleChange}
                    rows={2}
                  />
                  <p className="text-xs text-slate-500">
                    Pesan yang dikirim saat user klik nomor WhatsApp di footer
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    "Simpan Perubahan"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (data) {
                      setFormData({
                        phone: data.phone || "",
                        email: data.email || "",
                        address: data.address || "",
                        instagram: data.instagram || "",
                        facebook: data.facebook || "",
                        twitter: data.twitter || "",
                        whatsapp_message_hero: data.whatsapp_message_hero || "",
                        whatsapp_message_cta: data.whatsapp_message_cta || "",
                        whatsapp_message_footer: data.whatsapp_message_footer || "",
                        hero_program_title: data.hero_program_title || "",
                      });
                    }
                  }}
                  disabled={saving}
                >
                  Reset Form
                </Button>
              </div>
            </form>

            {/* Info Box */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Catatan Penting:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Semua perubahan akan langsung ditampilkan di footer website</li>
                <li>• Nomor WhatsApp akan otomatis tersinkronisasi di semua link WhatsApp</li>
                <li>• Data disimpan di Supabase database</li>
                <li>• Session dikelola oleh Supabase Authentication</li>
                <li>• Gunakan tombol Logout untuk keluar dengan aman</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
