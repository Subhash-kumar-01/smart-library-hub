import { motion } from "framer-motion";
import { BookOpen, Search, Filter, Star, Clock } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const categories = ["All", "Programming", "Mathematics", "Literature", "Competitive Exams", "Science", "Self Help"];

const books = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin", category: "Programming", rating: 4.8, pages: 464, progress: 78 },
  { id: 2, title: "Atomic Habits", author: "James Clear", category: "Self Help", rating: 4.9, pages: 320, progress: 92 },
  { id: 3, title: "Linear Algebra Done Right", author: "Sheldon Axler", category: "Mathematics", rating: 4.6, pages: 352, progress: 45 },
  { id: 4, title: "Introduction to Algorithms", author: "Thomas Cormen", category: "Programming", rating: 4.7, pages: 1312, progress: 22 },
  { id: 5, title: "1984", author: "George Orwell", category: "Literature", rating: 4.8, pages: 328, progress: 100 },
  { id: 6, title: "The Art of Problem Solving", author: "Richard Rusczyk", category: "Competitive Exams", rating: 4.5, pages: 256, progress: 60 },
  { id: 7, title: "A Brief History of Time", author: "Stephen Hawking", category: "Science", rating: 4.7, pages: 212, progress: 35 },
  { id: 8, title: "Design Patterns", author: "Gang of Four", category: "Programming", rating: 4.4, pages: 395, progress: 15 },
  { id: 9, title: "Quantitative Aptitude", author: "R.S. Aggarwal", category: "Competitive Exams", rating: 4.3, pages: 890, progress: 50 },
];

const colorMap: Record<string, string> = {
  Programming: "bg-primary/10 text-primary",
  Mathematics: "bg-info/10 text-info",
  Literature: "bg-accent/10 text-accent",
  "Competitive Exams": "bg-warning/10 text-warning",
  Science: "bg-success/10 text-success",
  "Self Help": "bg-destructive/10 text-destructive",
};

const LibraryPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = books.filter(
    (b) =>
      (activeCategory === "All" || b.category === activeCategory) &&
      (b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="page-container space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title">Library</h1>
        <p className="section-subtitle">Browse and read from our curated collection</p>
      </motion.div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search books or authors..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? "gradient-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((book, i) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer group"
          >
            <div className="flex gap-4">
              <div className="h-20 w-14 rounded-lg gradient-hero flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate">{book.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{book.author}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className={`text-[10px] ${colorMap[book.category] || ""}`}>{book.category}</Badge>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-accent fill-accent" />
                <span>{book.rating}</span>
              </div>
              <span>{book.pages} pages</span>
            </div>
            {book.progress > 0 && (
              <div className="mt-3">
                <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                  <span>Progress</span>
                  <span>{book.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full gradient-primary transition-all"
                    style={{ width: `${book.progress}%` }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LibraryPage;
