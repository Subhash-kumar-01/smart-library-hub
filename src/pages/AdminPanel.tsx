import { ShieldCheck, Users, BookOpen, MessageSquare } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminPanel() {
  const { profile } = useAuth();

  const stats = [
    { label: "Total Users", value: "—", icon: Users },
    { label: "Books", value: "—", icon: BookOpen },
    { label: "Open Doubts", value: "—", icon: MessageSquare },
  ];

  return (
    <div className="page-container space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <h1 className="section-title">Admin Panel</h1>
          <p className="section-subtitle">Welcome back, {profile?.name ?? "Admin"}.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="text-2xl font-bold mt-1">{value}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-2">Quick actions</h2>
        <p className="text-sm text-muted-foreground">
          Manage users, approve book requests, and moderate the Doubt Desk from here.
        </p>
      </div>
    </div>
  );
}
