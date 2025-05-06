import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PlusCircle, Trash2, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define the schema for form validation
const pollFormSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(100),
  description: z.string().max(500).optional(),
  options: z
    .array(
      z.object({
        text: z.string().min(1, { message: "Option cannot be empty" }),
      }),
    )
    .min(2, { message: "At least 2 options are required" })
    .max(5, { message: "Maximum 5 options allowed" }),
  isPublic: z.boolean().default(true),
  isAnonymous: z.boolean().default(false),
  showVoteCount: z.boolean().default(true),
});

type PollFormValues = z.infer<typeof pollFormSchema>;

interface CreatePollFormProps {
  onSubmit?: (data: PollFormValues) => void;
  isSubmitting?: boolean;
}

const CreatePollForm = ({
  onSubmit = () => {},
  isSubmitting = false,
}: CreatePollFormProps) => {
  const [formError, setFormError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PollFormValues>({
    resolver: zodResolver(pollFormSchema),
    defaultValues: {
      title: "",
      description: "",
      options: [{ text: "" }, { text: "" }],
      isPublic: true,
      isAnonymous: false,
      showVoteCount: true,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const submitForm = (data: PollFormValues) => {
    try {
      setFormError(null);
      onSubmit(data);
    } catch (error) {
      setFormError(
        "An error occurred while creating the poll. Please try again.",
      );
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create a New Poll</CardTitle>
        <CardDescription>
          Create a poll with up to 5 options. Polls are active for 3 days.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
          {formError && (
            <Alert variant="destructive">
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="title" className="font-medium">
              Poll Title <span className="text-red-500">*</span>
            </Label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  id="title"
                  placeholder="What would you like to ask?"
                  {...field}
                  className={errors.title ? "border-red-500" : ""}
                />
              )}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="font-medium">
              Description (Optional)
            </Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="description"
                  placeholder="Add more context to your question"
                  {...field}
                  className={errors.description ? "border-red-500" : ""}
                />
              )}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="font-medium">
                Poll Options <span className="text-red-500">*</span>
              </Label>
              <p className="text-sm text-gray-500">{fields.length}/5 options</p>
            </div>

            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <Controller
                  name={`options.${index}.text`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder={`Option ${index + 1}`}
                      {...field}
                      className={
                        errors.options?.[index]?.text
                          ? "border-red-500 flex-1"
                          : "flex-1"
                      }
                    />
                  )}
                />
                {fields.length > 2 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}

            {errors.options && typeof errors.options.message === "string" && (
              <p className="text-sm text-red-500">{errors.options.message}</p>
            )}

            {fields.length < 5 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ text: "" })}
                className="flex items-center gap-1 mt-2"
              >
                <PlusCircle className="h-4 w-4" />
                Add Option
              </Button>
            )}
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label htmlFor="isPublic" className="font-medium">
                  Public Poll
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Public polls appear on the Discover page and can be
                        shared via URL
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Controller
                name="isPublic"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="isPublic"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label htmlFor="isAnonymous" className="font-medium">
                  Anonymous Voting
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Hide voter identities from poll results</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Controller
                name="isAnonymous"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="isAnonymous"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label htmlFor="showVoteCount" className="font-medium">
                  Show Vote Count
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Display the total number of votes on the poll</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Controller
                name="showVoteCount"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="showVoteCount"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>

          <CardFooter className="px-0 pt-4">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating Poll..." : "Create Poll"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePollForm;
