import { motion } from "framer-motion";
import { BookOpen, Clock, Award, Flame, Trophy, Settings, LogOut, Mail, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ProfilePage = () => {
  return (
    <div className="page-container space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title">Profile</h1>
        <p className="section-subtitle">Your learning journey at a glance</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="glass-card p-6 text-center">
          <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full gradient-hero flex items-center justify-center text-primary-foreground text-xl sm:text-2xl font-display font-bold mx-auto mb-4">
            N
          </div>
          <h2 className="font-display font-bold text-lg">Nicku</h2>
          <p className="text-sm text-muted-foreground">nicku@example.com</p>
          <Badge variant="secondary" className="mt-2 bg-primary/10 text-primary text-xs">Scholar Level</Badge>

          <div className="grid grid-cols-3 gap-3 mt-6">
            {[
              { label: "Books", value: "24" },
              { label: "Hours", value: "186" },
              { label: "Points", value: "2.4k" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-lg font-display font-bold">{s.value}</p>
                <p className="text-[10px] text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-6">
            <Button variant="outline" size="sm" className="flex-1 text-xs gap-1.5 h-9">
              <Settings className="h-3.5 w-3.5" /> Settings
            </Button>
            <Button variant="outline" size="sm" className="flex-1 text-xs gap-1.5 h-9 text-destructive hover:text-destructive">
              <LogOut className="h-3.5 w-3.5" /> Sign Out
            </Button>
          </div>
        </motion.div>

        {/* Stats & Badges */}
        <div className="lg:col-span-2 space-y-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card p-5">
            <h3 className="font-display font-semibold mb-4">Learning Stats</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: BookOpen, label: "Books Read", value: "24", color: "text-primary" },
                { icon: Clock, label: "Total Hours", value: "186", color: "text-info" },
                { icon: Flame, label: "Best Streak", value: "15 days", color: "text-accent" },
                { icon: Trophy, label: "Rank", value: "#5", color: "text-warning" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-3 rounded-lg bg-muted/50">
                  <stat.icon className={`h-5 w-5 mx-auto mb-1.5 ${stat.color}`} />
                  <p className="text-lg font-display font-bold">{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card p-5">
            <h3 className="font-display font-semibold mb-4">Badges Earned</h3>
            <div className="flex flex-wrap gap-2">
              {["Bookworm", "Early Bird", "Helpful", "Streak Master", "Top Contributor", "Speed Reader"].map((badge) => (
                <Badge key={badge} variant="secondary" className="bg-primary/10 text-primary px-3 py-1 text-xs">{badge}</Badge>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card p-5">
            <h3 className="font-display font-semibold mb-3">Recent Activity</h3>
            <div className="space-y-3">
              {[
                "Completed reading 'Atomic Habits' — 2 hours ago",
                "Answered a doubt on DSA — 4 hours ago",
                "Joined 'GATE Prep Room' — 6 hours ago",
                "Earned 'Speed Reader' badge — 1 day ago",
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <span className="text-muted-foreground">{activity}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
