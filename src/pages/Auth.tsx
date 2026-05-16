import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, BookOpen, Sparkles, GraduationCap, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/contexts/AuthContext";

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(6, "Password must be at least 6 characters").max(72),
});

const signupSchema = z
  .object({
    name: z.string().trim().min(2, "Name is too short").max(100),
    email: z.string().trim().email("Enter a valid email").max(255),
    password: z
      .string()
      .min(8, "At least 8 characters")
      .max(72)
      .regex(/[A-Z]/, "Must include an uppercase letter")
      .regex(/[a-z]/, "Must include a lowercase letter")
      .regex(/[0-9]/, "Must include a number"),
    confirm: z.string(),
    role: z.enum(["student", "admin"]),
    terms: z.literal(true, { errorMap: () => ({ message: "You must accept the terms" }) }),
  })
  .refine((d) => d.password === d.confirm, { message: "Passwords don't match", path: ["confirm"] });

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, role, loading: authLoading } = useAuth();

  const [tab, setTab] = useState<"login" | "signup">("login");
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [loading, setLoading] = useState(false);

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [remember, setRemember] = useState(true);

  // Signup state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [selectedRole, setSelectedRole] = useState<"student" | "admin">("student");
  const [terms, setTerms] = useState(false);

  // Auto-redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      const dest = role === "admin" ? "/admin" : "/";
      navigate(dest, { replace: true });
    }
  }, [user, role, authLoading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = loginSchema.safeParse({ email: loginEmail, password: loginPassword });
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message.includes("Invalid") ? "Invalid email or password" : error.message);
      return;
    }
    toast.success("Welcome back!");
    const from = (location.state as any)?.from?.pathname;
    navigate(from || "/", { replace: true });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = signupSchema.safeParse({ name, email, password, confirm, role: selectedRole, terms });
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: { name: parsed.data.name, role: parsed.data.role },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message.includes("registered") ? "An account with this email already exists" : error.message);
      return;
    }
    toast.success("Account created! Welcome to MyLib.");
    navigate("/", { replace: true });
  };

  const handleGoogle = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setLoading(false);
      toast.error("Google sign-in failed. Please try again.");
      return;
    }
    if (result.redirected) return;
    setLoading(false);
    toast.success("Signed in with Google!");
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-[100dvh] grid lg:grid-cols-2 bg-background">
      {/* Left brand side */}
      <div className="hidden lg:flex relative gradient-hero text-primary-foreground p-12 flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/40 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
            <BookOpen className="h-6 w-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight">MyLib</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 space-y-6"
        >
          <h1 className="text-5xl font-bold leading-tight tracking-tight">
            Your smart<br />digital library.
          </h1>
          <p className="text-lg text-white/85 max-w-md">
            Read, track, collaborate, and grow — with the productivity platform built for serious learners.
          </p>
          <div className="grid grid-cols-2 gap-3 max-w-md pt-4">
            {[
              { icon: Sparkles, label: "Doubt Desk Rewards" },
              { icon: GraduationCap, label: "Study Rooms" },
              { icon: BookOpen, label: "10k+ Books" },
              { icon: ShieldCheck, label: "Secure & Private" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-xl px-3 py-2.5 border border-white/15">
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <p className="relative z-10 text-sm text-white/70">Built by Nicku · IIT-grade craftsmanship</p>
      </div>

      {/* Right form side */}
      <div className="flex items-center justify-center p-5 sm:p-8 relative">
        <div className="absolute inset-0 lg:hidden bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative w-full max-w-md"
        >
          {/* Mobile brand */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
            <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground">
              <BookOpen className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold">MyLib</span>
          </div>

          <div className="glass-card-elevated p-6 sm:p-8">
            <Tabs value={tab} onValueChange={(v) => setTab(v as any)} className="w-full">
              <TabsList className="grid grid-cols-2 w-full mb-6">
                <TabsTrigger value="login">Log in</TabsTrigger>
                <TabsTrigger value="signup">Sign up</TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                <TabsContent value="login" key="login" forceMount={tab === "login" ? true : undefined} className="mt-0">
                  <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}>
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
                      <p className="text-sm text-muted-foreground mt-1">Pick up where you left off.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="li-email">Email</Label>
                        <Input id="li-email" type="email" autoComplete="email" placeholder="you@example.com" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="li-pwd">Password</Label>
                          <Link to="/forgot-password" className="text-xs font-medium text-primary hover:underline">
                            Forgot password?
                          </Link>
                        </div>
                        <div className="relative">
                          <Input id="li-pwd" type={showPwd ? "text" : "password"} autoComplete="current-password" placeholder="••••••••" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required className="pr-10" />
                          <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label="Toggle password">
                            {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <Checkbox checked={remember} onCheckedChange={(v) => setRemember(!!v)} id="remember" />
                        <span className="text-sm text-muted-foreground">Remember me</span>
                      </label>

                      <Button type="submit" disabled={loading} className="w-full h-11">
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Log in"}
                      </Button>
                    </form>
                  </motion.div>
                </TabsContent>

                <TabsContent value="signup" key="signup" forceMount={tab === "signup" ? true : undefined} className="mt-0">
                  <motion.div initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}>
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold tracking-tight">Create your account</h2>
                      <p className="text-sm text-muted-foreground mt-1">Join thousands of focused learners.</p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="su-name">Full name</Label>
                        <Input id="su-name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="su-email">Email</Label>
                        <Input id="su-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="su-pwd">Password</Label>
                          <div className="relative">
                            <Input id="su-pwd" type={showPwd ? "text" : "password"} autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} required className="pr-10" />
                            <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label="Toggle password">
                              {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="su-confirm">Confirm</Label>
                          <div className="relative">
                            <Input id="su-confirm" type={showPwd2 ? "text" : "password"} autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required className="pr-10" />
                            <button type="button" onClick={() => setShowPwd2(!showPwd2)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label="Toggle password">
                              {showPwd2 ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>I am a</Label>
                        <RadioGroup value={selectedRole} onValueChange={(v) => setSelectedRole(v as any)} className="grid grid-cols-2 gap-2">
                          <label className={`flex items-center gap-2 rounded-lg border p-3 cursor-pointer transition-all ${selectedRole === "student" ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"}`}>
                            <RadioGroupItem value="student" id="role-student" />
                            <GraduationCap className="h-4 w-4" />
                            <span className="text-sm font-medium">Student</span>
                          </label>
                          <label className={`flex items-center gap-2 rounded-lg border p-3 cursor-pointer transition-all ${selectedRole === "admin" ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"}`}>
                            <RadioGroupItem value="admin" id="role-admin" />
                            <ShieldCheck className="h-4 w-4" />
                            <span className="text-sm font-medium">Admin</span>
                          </label>
                        </RadioGroup>
                        {selectedRole === "admin" && (
                          <p className="text-xs text-muted-foreground">Admin access is granted by an existing administrator after signup.</p>
                        )}
                      </div>

                      <label className="flex items-start gap-2 cursor-pointer select-none">
                        <Checkbox checked={terms} onCheckedChange={(v) => setTerms(!!v)} id="terms" className="mt-0.5" />
                        <span className="text-sm text-muted-foreground">
                          I agree to the <a className="text-primary hover:underline">Terms</a> and <a className="text-primary hover:underline">Privacy Policy</a>.
                        </span>
                      </label>

                      <Button type="submit" disabled={loading} className="w-full h-11">
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create account"}
                      </Button>
                    </form>
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </Tabs>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">or continue with</span>
              </div>
            </div>

            <Button type="button" variant="outline" onClick={handleGoogle} disabled={loading} className="w-full h-11">
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-6">
              {tab === "login" ? (
                <>New to MyLib? <button onClick={() => setTab("signup")} className="text-primary font-medium hover:underline">Create an account</button></>
              ) : (
                <>Already have an account? <button onClick={() => setTab("login")} className="text-primary font-medium hover:underline">Log in</button></>
              )}
            </p>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Built by <span className="font-semibold text-foreground">Nicku</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
