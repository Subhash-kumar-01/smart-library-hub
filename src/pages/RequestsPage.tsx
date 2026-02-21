import { motion } from "framer-motion";
import { FileText, Clock, CheckCircle2, XCircle, Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const requests = [
  { id: 1, title: "Introduction to Machine Learning", author: "Tom Mitchell", requestedBy: "Arjun K.", status: "approved", date: "Feb 15" },
  { id: 2, title: "Organic Chemistry - Morrison & Boyd", author: "Morrison", requestedBy: "Priya S.", status: "pending", date: "Feb 18" },
  { id: 3, title: "Discrete Mathematics and Its Applications", author: "Kenneth Rosen", requestedBy: "Nicku", status: "uploaded", date: "Feb 10" },
  { id: 4, title: "Fundamentals of Physics", author: "Halliday & Resnick", requestedBy: "Rahul M.", status: "pending", date: "Feb 19" },
  { id: 5, title: "Operating System Concepts", author: "Silberschatz", requestedBy: "Maya R.", status: "rejected", date: "Feb 12" },
];

const statusConfig: Record<string, { color: string; icon: React.ElementType; label: string }> = {
  pending: { color: "bg-warning/10 text-warning", icon: Clock, label: "Pending" },
  approved: { color: "bg-info/10 text-info", icon: CheckCircle2, label: "Approved" },
  uploaded: { color: "bg-success/10 text-success", icon: Upload, label: "Uploaded" },
  rejected: { color: "bg-destructive/10 text-destructive", icon: XCircle, label: "Rejected" },
};

const RequestsPage = () => {
  return (
    <div className="page-container space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="section-title">Book Requests</h1>
          <p className="section-subtitle">Request books and track their status</p>
        </div>
        <Button className="gradient-primary text-primary-foreground gap-2">
          <Plus className="h-4 w-4" /> Request Book
        </Button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Requests", value: "5", color: "text-foreground" },
          { label: "Pending", value: "2", color: "text-warning" },
          { label: "Approved", value: "1", color: "text-info" },
          { label: "Uploaded", value: "1", color: "text-success" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="stat-card text-center">
            <p className={`text-xl font-display font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Requests List */}
      <div className="space-y-3">
        {requests.map((req, i) => {
          const cfg = statusConfig[req.status];
          return (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="glass-card p-5 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="h-11 w-8 rounded-md gradient-hero flex items-center justify-center shrink-0 hidden sm:flex">
                  <FileText className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">{req.title}</h3>
                  <p className="text-xs text-muted-foreground truncate">by {req.author} · {req.requestedBy}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-muted-foreground hidden sm:block">{req.date}</span>
                  <Badge variant="secondary" className={`text-[10px] gap-1 ${cfg.color}`}>
                    <cfg.icon className="h-3 w-3" />
                    <span className="hidden sm:inline">{cfg.label}</span>
                  </Badge>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground text-center pt-4">Only legally shareable and public domain content is accepted.</p>
    </div>
  );
};

export default RequestsPage;
