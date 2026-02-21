import { motion } from "framer-motion";
import { Users, Lock, Globe, Timer, Crown, Plus, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const rooms = [
  { id: 1, name: "DSA Marathon", host: "Arjun K.", members: 12, max: 20, type: "public", topic: "Algorithms", timer: "45:22", focused: 8 },
  { id: 2, name: "JEE Physics Grind", host: "Priya S.", members: 8, max: 10, type: "private", topic: "Physics", timer: "32:10", focused: 6 },
  { id: 3, name: "Literature Circle", host: "Maya R.", members: 5, max: 15, type: "public", topic: "Literature", timer: "18:45", focused: 4 },
  { id: 4, name: "Calculus Study Group", host: "Rahul M.", members: 15, max: 20, type: "public", topic: "Mathematics", timer: "55:00", focused: 12 },
  { id: 5, name: "GATE Prep Room", host: "Sneha D.", members: 18, max: 25, type: "public", topic: "Comp. Science", timer: "1:12:30", focused: 14 },
  { id: 6, name: "Silent Study Hall", host: "Vikram P.", members: 22, max: 30, type: "public", topic: "General", timer: "2:05:11", focused: 20 },
];

const StudyRoomsPage = () => {
  return (
    <div className="page-container space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="section-title">Study Rooms</h1>
          <p className="section-subtitle">Focus together, achieve more</p>
        </div>
        <Button className="gradient-primary text-primary-foreground gap-2">
          <Plus className="h-4 w-4" /> Create Room
        </Button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Active Rooms", value: "6", icon: Users },
          { label: "Students Online", value: "80", icon: Zap },
          { label: "Avg Focus Time", value: "42 min", icon: Timer },
          { label: "Top Streak", value: "Vikram P.", icon: Crown },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="stat-card text-center">
            <stat.icon className="h-5 w-5 mx-auto text-primary mb-1.5" />
            <p className="text-lg font-display font-bold">{stat.value}</p>
            <p className="text-[11px] text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {rooms.map((room, i) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.06 }}
            className="glass-card p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm">{room.name}</h3>
                  {room.type === "private" ? (
                    <Lock className="h-3 w-3 text-muted-foreground" />
                  ) : (
                    <Globe className="h-3 w-3 text-muted-foreground" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">Hosted by {room.host}</p>
              </div>
              <Badge variant="secondary" className="text-[10px]">{room.topic}</Badge>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                <span>{room.members}/{room.max}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Timer className="h-3.5 w-3.5" />
                <span>{room.timer}</span>
              </div>
            </div>

            {/* Members bar */}
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mb-3">
              <div className="h-full rounded-full gradient-primary" style={{ width: `${(room.members / room.max) * 100}%` }} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex -space-x-1.5">
                {Array.from({ length: Math.min(room.focused, 4) }).map((_, j) => (
                  <div key={j} className="h-6 w-6 rounded-full gradient-primary border-2 border-card flex items-center justify-center text-[9px] text-primary-foreground font-bold">
                    {String.fromCharCode(65 + j)}
                  </div>
                ))}
                {room.focused > 4 && (
                  <div className="h-6 w-6 rounded-full bg-muted border-2 border-card flex items-center justify-center text-[9px] text-muted-foreground font-medium">
                    +{room.focused - 4}
                  </div>
                )}
              </div>
              <Button size="sm" variant="outline" className="h-7 text-xs">Join</Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StudyRoomsPage;
