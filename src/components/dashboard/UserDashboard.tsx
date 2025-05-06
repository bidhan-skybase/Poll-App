import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit, Trash2, Eye, Share2, BarChart2 } from "lucide-react";

interface UserDashboardProps {
  user?: {
    name: string;
    email: string;
    gender: string;
    dob: string;
    nationality: string;
    occupation: string;
    maritalStatus: string;
    avatarUrl?: string;
  };
  createdPolls?: Array<{
    id: string;
    title: string;
    description?: string;
    isPublic: boolean;
    createdAt: string;
    votesCount: number;
  }>;
  votedPolls?: Array<{
    id: string;
    title: string;
    description?: string;
    createdAt: string;
    votedAt: string;
    creatorName: string;
  }>;
}

const UserDashboard: React.FC<UserDashboardProps> = ({
  user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    gender: "Female",
    dob: "1990-01-01",
    nationality: "United States",
    occupation: "Software Engineer",
    maritalStatus: "Single",
  },
  createdPolls = [
    {
      id: "1",
      title: "Favorite Programming Language",
      description: "What programming language do you prefer to use?",
      isPublic: true,
      createdAt: "2023-05-15T10:30:00Z",
      votesCount: 42,
    },
    {
      id: "2",
      title: "Best Framework for Web Development",
      description:
        "Which framework do you think is best for modern web development?",
      isPublic: true,
      createdAt: "2023-05-10T14:20:00Z",
      votesCount: 38,
    },
    {
      id: "3",
      title: "Team Lunch Options",
      description: "Where should we go for our team lunch next week?",
      isPublic: false,
      createdAt: "2023-05-05T09:15:00Z",
      votesCount: 12,
    },
  ],
  votedPolls = [
    {
      id: "4",
      title: "Best Code Editor",
      description: "Which code editor do you prefer?",
      createdAt: "2023-05-12T11:45:00Z",
      votedAt: "2023-05-12T15:30:00Z",
      creatorName: "John Smith",
    },
    {
      id: "5",
      title: "Remote Work vs Office",
      description: "Do you prefer working remotely or in an office?",
      createdAt: "2023-05-08T08:20:00Z",
      votedAt: "2023-05-09T10:15:00Z",
      creatorName: "Sarah Johnson",
    },
  ],
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleEditToggle = () => {
    if (editMode) {
      // Save changes logic would go here
      // For now, just update the user state
      setEditMode(false);
    } else {
      setEditMode(true);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto py-8 bg-background">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="created-polls">Created Polls</TabsTrigger>
          <TabsTrigger value="voted-polls">Voted Polls</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
              <CardDescription>
                Manage your personal information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex flex-col items-center gap-4 mb-6 md:mb-0">
                  <Avatar className="w-32 h-32">
                    <AvatarImage
                      src={
                        user.avatarUrl ||
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`
                      }
                      alt={user.name}
                    />
                    <AvatarFallback>
                      {user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      {editMode ? (
                        <Input
                          id="name"
                          name="name"
                          value={editedUser.name}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="text-sm py-2">{user.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      {editMode ? (
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={editedUser.email}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="text-sm py-2">{user.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      {editMode ? (
                        <Select
                          value={editedUser.gender}
                          onValueChange={(value) =>
                            handleSelectChange("gender", value)
                          }
                        >
                          <SelectTrigger id="gender">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                            <SelectItem value="Prefer not to say">
                              Prefer not to say
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="text-sm py-2">{user.gender}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      {editMode ? (
                        <Input
                          id="dob"
                          name="dob"
                          type="date"
                          value={editedUser.dob}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="text-sm py-2">{formatDate(user.dob)}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nationality">Nationality</Label>
                      {editMode ? (
                        <Input
                          id="nationality"
                          name="nationality"
                          value={editedUser.nationality}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="text-sm py-2">{user.nationality}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="occupation">Occupation</Label>
                      {editMode ? (
                        <Input
                          id="occupation"
                          name="occupation"
                          value={editedUser.occupation}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="text-sm py-2">{user.occupation}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maritalStatus">Marital Status</Label>
                      {editMode ? (
                        <Select
                          value={editedUser.maritalStatus}
                          onValueChange={(value) =>
                            handleSelectChange("maritalStatus", value)
                          }
                        >
                          <SelectTrigger id="maritalStatus">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Single">Single</SelectItem>
                            <SelectItem value="Married">Married</SelectItem>
                            <SelectItem value="Divorced">Divorced</SelectItem>
                            <SelectItem value="Widowed">Widowed</SelectItem>
                            <SelectItem value="Prefer not to say">
                              Prefer not to say
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="text-sm py-2">{user.maritalStatus}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button
                      onClick={handleEditToggle}
                      variant={editMode ? "default" : "outline"}
                    >
                      {editMode ? "Save Changes" : "Edit Profile"}
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                          Deactivate Account
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action will deactivate your account. All your
                            data will be permanently removed. This action cannot
                            be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-destructive text-destructive-foreground">
                            Yes, Deactivate Account
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Created Polls Tab */}
        <TabsContent value="created-polls">
          <Card>
            <CardHeader>
              <CardTitle>Your Created Polls</CardTitle>
              <CardDescription>Manage the polls you've created</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {createdPolls.length > 0 ? (
                  createdPolls.map((poll) => (
                    <Card key={poll.id} className="overflow-hidden">
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-lg font-semibold">
                              {poll.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {poll.description}
                            </p>
                          </div>
                          <Badge
                            variant={poll.isPublic ? "default" : "outline"}
                          >
                            {poll.isPublic ? "Public" : "Private"}
                          </Badge>
                        </div>

                        <div className="flex items-center text-sm text-muted-foreground mb-4">
                          <span>Created: {formatDate(poll.createdAt)}</span>
                          <span className="mx-2">•</span>
                          <span>{poll.votesCount} votes</span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <Eye className="h-4 w-4" /> View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <Edit className="h-4 w-4" /> Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <Share2 className="h-4 w-4" /> Share
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <BarChart2 className="h-4 w-4" /> Results
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="destructive"
                                className="flex items-center gap-1"
                              >
                                <Trash2 className="h-4 w-4" /> Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Poll</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this poll?
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction className="bg-destructive text-destructive-foreground">
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      You haven't created any polls yet.
                    </p>
                    <Button className="mt-4">Create Your First Poll</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Voted Polls Tab */}
        <TabsContent value="voted-polls">
          <Card>
            <CardHeader>
              <CardTitle>Polls You've Voted On</CardTitle>
              <CardDescription>
                View polls you've participated in
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {votedPolls.length > 0 ? (
                  votedPolls.map((poll) => (
                    <Card key={poll.id} className="overflow-hidden">
                      <div className="p-6">
                        <div className="mb-2">
                          <h3 className="text-lg font-semibold">
                            {poll.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {poll.description}
                          </p>
                        </div>

                        <div className="flex items-center text-sm text-muted-foreground mb-4">
                          <span>Created by: {poll.creatorName}</span>
                          <span className="mx-2">•</span>
                          <span>Voted on: {formatDate(poll.votedAt)}</span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <Eye className="h-4 w-4" /> View Results
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      You haven't voted on any polls yet.
                    </p>
                    <Button className="mt-4">Discover Polls</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
