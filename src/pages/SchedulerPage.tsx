import { motion } from "framer-motion";
import { Calendar, Target, Flame, Award, Clock, CheckCircle2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const streakData = [true, true, true, false, true, true, true, true, true, true, false, true, true, true, true];

const schedule = [
  { id: 1, book: "Clean Code", time: "06:00 - 07:00", completed: true },
  { id: 2, book: "Linear Algebra", time: "10:00 - 10:45", completed: true },
  { id: 3, book: "Introduction to Algorithms", time: "16:00 - 17:00", completed: false },
  { id: 4, book: "Atomic Habits", time: "21:00 - 21:30", completed: false },
];

const achievements = [
  { label: "7-Day Streak", icon: Flame, earned: true },
  { label: "100 Hours Read", icon: Clock, earned: true },
  { label: "Early Bird", icon: Award, earned: true },
  { label: "30-Day Streak", icon: Flame, earned: false },
  { label: "500 Pages/Week", icon: Target, earned: false },
  { label: "Night Owl", icon: Award, earned: false },
];

const SchedulerPage = () => {
  return (
    <div className="page-container space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="section-title">Reading Scheduler</h1>
          <p className="section-subtitle">Plan, track, achieve your reading goals</p>
        </div>
        <Button className="gradient-primary text-primary-foreground gap-2">
          <Plus className="h-4 w-4" /> New Goal
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 space-y-4">
          {/* Goal Card */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <h3 className="font-display font-semibold">Daily Goal</h3>
              </div>
              <span className="text-sm font-medium text-primary">32/45 min</span>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: "71%" }} transition={{ delay: 0.3, duration: 0.8 }} className="h-full rounded-full gradient-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">13 minutes remaining to hit your goal!</p>
          </motion.div>

          {/* Schedule */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card p-5">
            <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Today's Schedule
            </h3>
            <div className="space-y-3">
              {schedule.map((slot) => (
                <div key={slot.id} className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${slot.completed ? "bg-success/5" : "hover:bg-muted/50"}`}>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${slot.completed ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                    {slot.completed ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${slot.completed ? "line-through text-muted-foreground" : ""}`}>{slot.book}</p>
                    <p className="text-xs text-muted-foreground">{slot.time}</p>
                  </div>
                  {!slot.completed && <Button size="sm" variant="outline" className="h-7 text-xs">Start</Button>}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Streak */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="h-5 w-5 text-accent" />
              <h3 className="font-display font-semibold">15 Day Streak</h3>
            </div>
            <div className="grid grid-cols-7 gap-1.5">
              {streakData.map((active, i) => (
                <div
                  key={i}
                  className={`h-7 w-full rounded-md flex items-center justify-center text-[10px] font-medium transition-colors ${
                    active ? "gradient-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-primary" />
              <h3 className="font-display font-semibold">Achievements</h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {achievements.map((badge) => (
                <div
                  key={badge.label}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-lg text-center transition-colors ${
                    badge.earned ? "bg-primary/5" : "bg-muted/50 opacity-40"
                  }`}
                >
                  <badge.icon className={`h-5 w-5 ${badge.earned ? "text-primary" : "text-muted-foreground"}`} />
                  <span className="text-[10px] font-medium leading-tight">{badge.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SchedulerPage;
