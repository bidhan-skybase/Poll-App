import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Share2, Clock } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface PollCardProps {
  id: string;
  title: string;
  description?: string;
  options: PollOption[];
  creator: {
    id: string;
    name: string;
    avatar?: string;
  };
  totalVotes: number;
  showVoteCount: boolean;
  isAnonymous: boolean;
  isPublic: boolean;
  createdAt: string;
  expiresAt: string;
  hasVoted?: boolean;
  userVote?: string;
  onVote?: (optionId: string) => void;
  onShare?: () => void;
}

const PollCard = ({
  id = "poll-1",
  title = "What's your favorite programming language?",
  description = "Help us understand which programming language is most popular among developers.",
  options = [
    { id: "opt1", text: "JavaScript", votes: 42 },
    { id: "opt2", text: "Python", votes: 36 },
    { id: "opt3", text: "TypeScript", votes: 28 },
    { id: "opt4", text: "Java", votes: 18 },
  ],
  creator = {
    id: "user1",
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  totalVotes = 124,
  showVoteCount = true,
  isAnonymous = false,
  isPublic = true,
  createdAt = "2023-06-15T10:30:00Z",
  expiresAt = "2023-06-18T10:30:00Z",
  hasVoted = false,
  userVote = "",
  onVote = () => {},
  onShare = () => {},
}: PollCardProps) => {
  const [selectedOption, setSelectedOption] = React.useState<string>(userVote);
  const [voted, setVoted] = React.useState<boolean>(hasVoted);

  // Calculate time remaining until expiration
  const now = new Date();
  const expiry = new Date(expiresAt);
  const timeRemaining = expiry.getTime() - now.getTime();
  const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60));

  const handleVote = () => {
    if (selectedOption && !voted) {
      onVote(selectedOption);
      setVoted(true);
    }
  };

  const calculatePercentage = (votes: number) => {
    return totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
  };

  return (
    <Card className="w-full max-w-md bg-white shadow-md hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
          {isPublic ? (
            <Badge variant="secondary">Public</Badge>
          ) : (
            <Badge variant="outline">Private</Badge>
          )}
        </div>
        <div className="flex items-center mt-2 text-sm text-muted-foreground">
          {!isAnonymous && (
            <div className="flex items-center">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={creator.avatar} alt={creator.name} />
                <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{creator.name}</span>
            </div>
          )}
          {isAnonymous && <span>Anonymous</span>}

          <div className="ml-auto flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{hoursRemaining} hours left</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {!voted ? (
          <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
            {options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2 py-2">
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id} className="flex-grow">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        ) : (
          <div className="space-y-4">
            {options.map((option) => {
              const percentage = calculatePercentage(option.votes);
              return (
                <div key={option.id} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{option.text}</span>
                    {showVoteCount && (
                      <span className="text-sm text-muted-foreground">
                        {percentage}% ({option.votes} votes)
                      </span>
                    )}
                  </div>
                  <Progress
                    value={percentage}
                    className={`h-2 ${option.id === userVote ? "bg-primary/30" : ""}`}
                  />
                </div>
              );
            })}
            {showVoteCount && (
              <div className="text-sm text-muted-foreground text-right mt-2">
                Total: {totalVotes} votes
              </div>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        {!voted ? (
          <Button
            onClick={handleVote}
            disabled={!selectedOption}
            className="w-full"
          >
            Vote
          </Button>
        ) : (
          <div className="w-full flex justify-between">
            <span className="text-sm text-muted-foreground self-center">
              Thanks for voting!
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={onShare}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share this poll</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default PollCard;
