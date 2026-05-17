import { useState } from "react";
import { motion } from "framer-motion";
import { ThumbsUp, MessageSquare, CheckCircle2, Award, Crown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

type Question = {
  id: number;
  title: string;
  author: string;
  subject: string;
  votes: number;
  answers: number;
  solved: boolean;
  time: string;
  voted?: boolean;
};

const initialQuestions: Question[] = [
  { id: 1, title: "How does dynamic programming differ from greedy algorithms?", author: "Arjun K.", subject: "DSA", votes: 24, answers: 5, solved: true, time: "2h ago" },
  { id: 2, title: "Explain the intuition behind Eigenvalues", author: "Priya S.", subject: "Mathematics", votes: 18, answers: 3, solved: false, time: "4h ago" },
  { id: 3, title: "Best resources for JEE Advanced Physics?", author: "Rahul M.", subject: "Physics", votes: 32, answers: 8, solved: true, time: "6h ago" },
  { id: 4, title: "Why is Big-O notation important?", author: "Maya R.", subject: "DSA", votes: 15, answers: 4, solved: true, time: "1d ago" },
  { id: 5, title: "How to solve integration by parts problems?", author: "Sneha D.", subject: "Mathematics", votes: 11, answers: 2, solved: false, time: "1d ago" },
];

const leaderboard = [
  { name: "Vikram P.", points: 4250, level: "Expert", rank: 1 },
  { name: "Sneha D.", points: 3800, level: "Master", rank: 2 },
  { name: "Arjun K.", points: 3200, level: "Master", rank: 3 },
  { name: "Priya S.", points: 2900, level: "Scholar", rank: 4 },
  { name: "Nicku", points: 2450, level: "Scholar", rank: 5 },
];

const subjectColors: Record<string, string> = {
  DSA: "bg-primary/10 text-primary",
  Mathematics: "bg-info/10 text-info",
  Physics: "bg-accent/10 text-accent",
  Chemistry: "bg-success/10 text-success",
  Other: "bg-muted text-muted-foreground",
};

const DoubtDeskPage = () => {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", subject: "DSA", details: "" });

  const handleAsk = () => {
    if (!form.title.trim()) {
      toast({ title: "Missing question", description: "Please enter your question." });
      return;
    }
    const q: Question = {
      id: Date.now(),
      title: form.title.trim(),
      author: "You",
      subject: form.subject,
      votes: 0,
      answers: 0,
      solved: false,
      time: "just now",
    };
    setQuestions([q, ...questions]);
    setForm({ title: "", subject: "DSA", details: "" });
    setOpen(false);
    toast({ title: "Question posted", description: "Your doubt is now live." });
  };

  const handleVote = (id: number) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, voted: !q.voted, votes: q.votes + (q.voted ? -1 : 1) } : q)),
    );
  };

  return (
    <div className="page-container space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="section-title">Doubt Desk</h1>
          <p className="section-subtitle">Ask, answer, earn rewards</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-primary-foreground gap-2">
              <Plus className="h-4 w-4" /> Ask Question
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Ask a question</DialogTitle>
              <DialogDescription>Be specific so the community can help you faster.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="q-title">Question</Label>
                <Input id="q-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="What's confusing you?" />
              </div>
              <div className="space-y-2">
                <Label>Subject</Label>
                <Select value={form.subject} onValueChange={(v) => setForm({ ...form, subject: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["DSA", "Mathematics", "Physics", "Chemistry", "Other"].map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="q-details">Details (optional)</Label>
                <Textarea id="q-details" rows={4} value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} placeholder="Add context, what you've tried, etc." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button className="gradient-primary text-primary-foreground" onClick={handleAsk}>Post question</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {questions.map((q, i) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i, 5) * 0.06 }}
              className="glass-card p-5 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex gap-3 sm:gap-4">
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleVote(q.id)}
                    className={`p-1.5 rounded hover:bg-muted transition-colors ${q.voted ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
                    aria-label="Upvote"
                  >
                    <ThumbsUp className="h-4 w-4" />
                  </button>
                  <span className="text-sm font-bold">{q.votes}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-sm">{q.title}</h3>
                    {q.solved && <CheckCircle2 className="h-4 w-4 text-success shrink-0" />}
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground flex-wrap">
                    <span>{q.author}</span>
                    <Badge variant="secondary" className={`text-[10px] ${subjectColors[q.subject] || subjectColors.Other}`}>{q.subject}</Badge>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      <span>{q.answers}</span>
                    </div>
                    <span>{q.time}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Crown className="h-5 w-5 text-accent" />
            <h3 className="font-display font-semibold">Leaderboard</h3>
          </div>
          <div className="space-y-3">
            {leaderboard.map((user) => (
              <div key={user.rank} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <span className={`text-sm font-bold w-5 text-center ${user.rank <= 3 ? "text-accent" : "text-muted-foreground"}`}>
                  {user.rank}
                </span>
                <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                  {user.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-[10px] text-muted-foreground">{user.level}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Award className="h-3 w-3 text-accent" />
                  <span className="font-medium">{user.points.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DoubtDeskPage;
