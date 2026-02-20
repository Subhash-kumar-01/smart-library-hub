import { motion } from "framer-motion";
import { HelpCircle, ThumbsUp, MessageSquare, CheckCircle2, Award, Crown, TrendingUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const questions = [
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
};

const DoubtDeskPage = () => {
  return (
    <div className="page-container space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="section-title">Doubt Desk</h1>
          <p className="section-subtitle">Ask, answer, earn rewards</p>
        </div>
        <Button className="gradient-primary text-primary-foreground gap-2">
          <Plus className="h-4 w-4" /> Ask Question
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Questions List */}
        <div className="lg:col-span-2 space-y-3">
          {questions.map((q, i) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="glass-card p-5 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="flex gap-4">
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <button className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-primary">
                    <ThumbsUp className="h-4 w-4" />
                  </button>
                  <span className="text-sm font-bold">{q.votes}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-sm">{q.title}</h3>
                    {q.solved && <CheckCircle2 className="h-4 w-4 text-success shrink-0" />}
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span>{q.author}</span>
                    <Badge variant="secondary" className={`text-[10px] ${subjectColors[q.subject] || ""}`}>{q.subject}</Badge>
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

        {/* Leaderboard */}
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
