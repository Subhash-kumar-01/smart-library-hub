import { motion } from "framer-motion";
import { BookOpen, Clock, Flame, TrendingUp, Users, HelpCircle, Target, Award } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const weeklyData = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 1.8 },
  { day: "Wed", hours: 3.2 },
  { day: "Thu", hours: 2.1 },
  { day: "Fri", hours: 4.0 },
  { day: "Sat", hours: 3.5 },
  { day: "Sun", hours: 2.8 },
];

const monthlyData = [
  { week: "W1", pages: 120 },
  { week: "W2", pages: 180 },
  { week: "W3", pages: 150 },
  { week: "W4", pages: 220 },
];

const stats = [
  { label: "Books Read", value: "24", icon: BookOpen, change: "+3 this month", color: "text-primary" },
  { label: "Hours Spent", value: "186", icon: Clock, change: "+12 this week", color: "text-info" },
  { label: "Day Streak", value: "15", icon: Flame, change: "Personal best!", color: "text-accent" },
  { label: "Points Earned", value: "2,450", icon: Award, change: "Level: Scholar", color: "text-success" },
];

const recentBooks = [
  { title: "Clean Code", author: "Robert C. Martin", progress: 78, category: "Programming" },
  { title: "Atomic Habits", author: "James Clear", progress: 92, category: "Self Help" },
  { title: "Linear Algebra", author: "Gilbert Strang", progress: 45, category: "Mathematics" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
};

const Dashboard = () => {
  return (
    <div className="page-container space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-1">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-bold">Welcome back, Nicku 👋</h1>
        <p className="section-subtitle">Here's your learning overview for today</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} custom={i} variants={fadeUp} initial="hidden" animate="visible" className="stat-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-xl sm:text-2xl font-display font-bold mt-1">{stat.value}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 hidden sm:block">{stat.change}</p>
              </div>
              <div className={`p-2.5 rounded-lg bg-muted ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card p-4 sm:p-6">
          <h3 className="font-display font-semibold mb-4">Weekly Reading Hours</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} className="text-xs" tick={{ fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} className="text-xs" tick={{ fontSize: 11 }} width={30} />
              <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
              <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card p-4 sm:p-6">
          <h3 className="font-display font-semibold mb-4">Monthly Pages Read</h3>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={monthlyData}>
              <XAxis dataKey="week" axisLine={false} tickLine={false} className="text-xs" tick={{ fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} className="text-xs" tick={{ fontSize: 11 }} width={35} />
              <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
              <Area type="monotone" dataKey="pages" stroke="hsl(var(--accent))" fill="hsl(var(--accent) / 0.15)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Books + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="lg:col-span-2 glass-card p-4 sm:p-6">
          <h3 className="font-display font-semibold mb-4">Continue Reading</h3>
          <div className="space-y-3">
            {recentBooks.map((book) => (
              <div key={book.title} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="h-12 w-9 rounded-md gradient-primary flex items-center justify-center shrink-0">
                  <BookOpen className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{book.title}</p>
                  <p className="text-xs text-muted-foreground">{book.author} · {book.category}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0 hidden sm:flex">
                  <div className="w-20 sm:w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full rounded-full gradient-primary" style={{ width: `${book.progress}%` }} />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground w-8">{book.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="glass-card p-4 sm:p-6 space-y-3">
          <h3 className="font-display font-semibold mb-2">Quick Actions</h3>
          {[
            { icon: Users, label: "Join Study Room", desc: "3 active rooms" },
            { icon: HelpCircle, label: "Ask a Doubt", desc: "Get help now" },
            { icon: Target, label: "Set Today's Goal", desc: "45 min remaining" },
          ].map((action) => (
            <button key={action.label} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <action.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">{action.label}</p>
                <p className="text-xs text-muted-foreground">{action.desc}</p>
              </div>
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
