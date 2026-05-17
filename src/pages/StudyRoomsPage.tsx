import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Lock, Globe, Timer, Crown, Plus, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

type Room = {
  id: number;
  name: string;
  host: string;
  members: number;
  max: number;
  type: "public" | "private";
  topic: string;
  timer: string;
  focused: number;
};

const initialRooms: Room[] = [
  { id: 1, name: "DSA Marathon", host: "Arjun K.", members: 12, max: 20, type: "public", topic: "Algorithms", timer: "45:22", focused: 8 },
  { id: 2, name: "JEE Physics Grind", host: "Priya S.", members: 8, max: 10, type: "private", topic: "Physics", timer: "32:10", focused: 6 },
  { id: 3, name: "Literature Circle", host: "Maya R.", members: 5, max: 15, type: "public", topic: "Literature", timer: "18:45", focused: 4 },
  { id: 4, name: "Calculus Study Group", host: "Rahul M.", members: 15, max: 20, type: "public", topic: "Mathematics", timer: "55:00", focused: 12 },
  { id: 5, name: "GATE Prep Room", host: "Sneha D.", members: 18, max: 25, type: "public", topic: "Comp. Science", timer: "1:12:30", focused: 14 },
  { id: 6, name: "Silent Study Hall", host: "Vikram P.", members: 22, max: 30, type: "public", topic: "General", timer: "2:05:11", focused: 20 },
];

const StudyRoomsPage = () => {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", topic: "", max: "10", type: "public" as "public" | "private" });

  const handleCreate = () => {
    if (!form.name.trim() || !form.topic.trim()) {
      toast({ title: "Missing info", description: "Room name and topic are required." });
      return;
    }
    const newRoom: Room = {
      id: Date.now(),
      name: form.name.trim(),
      host: "You",
      members: 1,
      max: parseInt(form.max) || 10,
      type: form.type,
      topic: form.topic.trim(),
      timer: "00:00",
      focused: 1,
    };
    setRooms([newRoom, ...rooms]);
    setForm({ name: "", topic: "", max: "10", type: "public" });
    setOpen(false);
    toast({ title: "Room created", description: `${newRoom.name} is live.` });
  };

  const handleJoin = (room: Room) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === room.id && r.members < r.max ? { ...r, members: r.members + 1, focused: r.focused + 1 } : r)),
    );
    toast({ title: "Joined room", description: `Welcome to ${room.name}.` });
  };

  return (
    <div className="page-container space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="section-title">Study Rooms</h1>
          <p className="section-subtitle">Focus together, achieve more</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-primary-foreground gap-2">
              <Plus className="h-4 w-4" /> Create Room
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create study room</DialogTitle>
              <DialogDescription>Set up a focused space for you and your peers.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="room-name">Room name</Label>
                <Input id="room-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Morning DSA Sprint" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="room-topic">Topic</Label>
                <Input id="room-topic" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} placeholder="e.g. Algorithms" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="room-max">Max members</Label>
                  <Input id="room-max" type="number" min={2} max={100} value={form.max} onChange={(e) => setForm({ ...form, max: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Visibility</Label>
                  <Select value={form.type} onValueChange={(v: "public" | "private") => setForm({ ...form, type: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button className="gradient-primary text-primary-foreground" onClick={handleCreate}>Create room</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Active Rooms", value: String(rooms.length), icon: Users },
          { label: "Students Online", value: String(rooms.reduce((a, r) => a + r.members, 0)), icon: Zap },
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
              <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => handleJoin(room)} disabled={room.members >= room.max}>
                {room.members >= room.max ? "Full" : "Join"}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StudyRoomsPage;
