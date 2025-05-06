import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Search, Plus, Filter } from "lucide-react";
import PollCard from "./polls/PollCard";
import AuthModal from "./auth/AuthModal";
import { useNavigate } from "react-router-dom";

interface Poll {
  id: string;
  title: string;
  description: string;
  creator: {
    name: string;
    avatar: string;
  };
  options: {
    id: string;
    text: string;
    votes: number;
  }[];
  totalVotes: number;
  showVoteCount: boolean;
  createdAt: string;
  isAnonymous: boolean;
  hasVoted: boolean;
}

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState("trending");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Mock polls data
  const mockPolls: Poll[] = [
    {
      id: "1",
      title: "What is your favorite programming language?",
      description: "Please vote for your most preferred programming language",
      creator: {
        name: "John Doe",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      },
      options: [
        { id: "1a", text: "JavaScript", votes: 42 },
        { id: "1b", text: "Python", votes: 38 },
        { id: "1c", text: "Java", votes: 27 },
        { id: "1d", text: "C#", votes: 19 },
      ],
      totalVotes: 126,
      showVoteCount: true,
      createdAt: "2023-06-15T10:30:00Z",
      isAnonymous: false,
      hasVoted: false,
    },
    {
      id: "2",
      title: "Which frontend framework do you prefer?",
      description: "Vote for your favorite frontend framework",
      creator: {
        name: "Jane Smith",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      },
      options: [
        { id: "2a", text: "React", votes: 56 },
        { id: "2b", text: "Vue", votes: 34 },
        { id: "2c", text: "Angular", votes: 28 },
        { id: "2d", text: "Svelte", votes: 22 },
      ],
      totalVotes: 140,
      showVoteCount: true,
      createdAt: "2023-06-16T14:20:00Z",
      isAnonymous: false,
      hasVoted: true,
    },
    {
      id: "3",
      title: "How often do you refactor your code?",
      description: "Curious about coding habits",
      creator: {
        name: "Alex Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      },
      options: [
        { id: "3a", text: "Daily", votes: 18 },
        { id: "3b", text: "Weekly", votes: 32 },
        { id: "3c", text: "Monthly", votes: 24 },
        { id: "3d", text: "Rarely", votes: 12 },
      ],
      totalVotes: 86,
      showVoteCount: false,
      createdAt: "2023-06-17T09:15:00Z",
      isAnonymous: true,
      hasVoted: false,
    },
  ];

  const handleCreatePoll = () => {
    if (isAuthenticated) {
      navigate("/create-poll");
    } else {
      setShowAuthModal(true);
    }
  };

  const handleLogin = () => {
    setShowAuthModal(true);
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 z-10 bg-background">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">PollVault</h1>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button variant="outline" onClick={handleDashboard}>
                  Dashboard
                </Button>
                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button onClick={handleLogin}>Login / Register</Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold">Discover Polls</h2>
            <p className="text-muted-foreground mt-1">
              {isAuthenticated
                ? "Vote on public polls or create your own"
                : "Browse public polls or sign in to vote and create"}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search polls..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={handleCreatePoll} className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Create Poll
            </Button>
          </div>
        </div>

        {/* Tabs and Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <Tabs
            defaultValue="trending"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="popular">Most Voted</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" /> Filter
          </Button>
        </div>

        {/* Poll Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPolls.map((poll) => (
            <PollCard
              key={poll.id}
              poll={poll}
              isAuthenticated={isAuthenticated}
              onAuthRequired={() => setShowAuthModal(true)}
            />
          ))}
        </div>

        {/* Empty State */}
        {mockPolls.length === 0 && (
          <Card className="w-full mt-8">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-muted p-6 mb-4">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No polls found</h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                {searchQuery
                  ? `No polls match your search for "${searchQuery}"`
                  : "There are no polls available at the moment"}
              </p>
              <Button onClick={handleCreatePoll}>
                <Plus className="mr-2 h-4 w-4" /> Create the first poll
              </Button>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Home;
