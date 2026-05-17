import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Target, Flame, Award, Clock, CheckCircle2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const streakData = [true, true, true, false, true, true, true, true, true, true, false, true, true, true, true];

type Slot = { id: number; book: string; time: string; completed: boolean };

const initialSchedule: Slot[] = [
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
  const [schedule, setSchedule] = useState<Slot[]>(initialSchedule);
  const [dailyGoal, setDailyGoal] = useState(45);
  const [progress, setProgress] = useState(32);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ book: "", from: "", to: "", goal: "45" });

  const handleAdd = () => {
    if (!form.book.trim() || !form.from || !form.to) {
      toast({ title: "Missing info", description: "Book and time range are required." });
      return;
    }
    const newSlot: Slot = {
      id: Date.now(),
      book: form.book.trim(),
      time: `${form.from} - ${form.to}`,
      completed: false,
    };
    setSchedule([...schedule, newSlot]);
    const g = parseInt(form.goal);
    if (g > 0) setDailyGoal(g);
    setForm({ book: "", from: "", to: "", goal: String(dailyGoal) });
    setOpen(false);
    toast({ title: "Goal added", description: `${newSlot.book} scheduled.` });
  };

  const toggleSlot = (id: number) => {
    setSchedule((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const next = !s.completed;
        setProgress((p) => Math.max(0, Math.min(dailyGoal, p + (next ? 15 : -15))));
        return { ...s, completed: next };
      }),
    );
  };

  const pct = Math.min(100, Math.round((progress / dailyGoal) * 100));
  const remaining = Math.max(0, dailyGoal - progress);

  return (
    <div className="page-container space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="section-title">Reading Scheduler</h1>
          <p className="section-subtitle">Plan, track, achieve your reading goals</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-primary-foreground gap-2">
              <Plus className="h-4 w-4" /> New Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>New reading goal</DialogTitle>
              <DialogDescription>Add a book to today's plan and adjust your daily target.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="book">Book</Label>
                <Input id="book" value={form.book} onChange={(e) => setForm({ ...form, book: e.target.value })} placeholder="e.g. Deep Work" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="from">From</Label>
                  <Input id="from" type="time" value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to">To</Label>
                  <Input id="to" type="time" value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal">Daily goal (minutes)</Label>
                <Input id="goal" type="number" min={5} max={600} value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button className="gradient-primary text-primary-foreground" onClick={handleAdd}>Add to schedule</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <h3 className="font-display font-semibold">Daily Goal</h3>
              </div>
              <span className="text-sm font-medium text-primary">{progress}/{dailyGoal} min</span>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <motion.div animate={{ width: `${pct}%` }} transition={{ duration: 0.5 }} className="h-full rounded-full gradient-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {remaining > 0 ? `${remaining} minutes remaining to hit your goal!` : "Goal complete — great work!"}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card p-5">
            <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Today's Schedule
            </h3>
            <div className="space-y-3">
              {schedule.map((slot) => (
                <div key={slot.id} className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${slot.completed ? "bg-success/5" : "hover:bg-muted/50"}`}>
                  <button
                    onClick={() => toggleSlot(slot.id)}
                    className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${slot.completed ? "bg-success/10 text-success" : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"}`}
                    aria-label="Toggle complete"
                  >
                    {slot.completed ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                  </button>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${slot.completed ? "line-through text-muted-foreground" : ""}`}>{slot.book}</p>
                    <p className="text-xs text-muted-foreground">{slot.time}</p>
                  </div>
                  {!slot.completed && (
                    <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => toggleSlot(slot.id)}>
                      Start
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="space-y-4">
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

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-primary" />
              <h3 className="font-display font-semibold">Achievements</h3>
            </div>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {achievements.map((badge) => (
                <div
                  key={badge.label}
                  className={`flex flex-col items-center gap-1 sm:gap-1.5 p-2 sm:p-3 rounded-lg text-center transition-colors ${
                    badge.earned ? "bg-primary/5" : "bg-muted/50 opacity-40"
                  }`}
                >
                  <badge.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${badge.earned ? "text-primary" : "text-muted-foreground"}`} />
                  <span className="text-[9px] sm:text-[10px] font-medium leading-tight">{badge.label}</span>
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
