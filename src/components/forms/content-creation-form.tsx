"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import generateContent from "@/actions/generate-content";
import { generatePPT } from "@/lib/generate-ppt";

type Props = {
  topic: string;
};

export const contentCreationSchema = z.object({
  topic: z
    .string()
    .min(4, {
      message: "Topic must be at least 4 characters long",
    })
    .max(50, {
      message: "Topic must be at most 50 characters long",
    }),
});

type Input = z.infer<typeof contentCreationSchema>;

const ContentCreationForm = () => {
  const form = useForm<Input>({
    resolver: zodResolver(contentCreationSchema),
  });

  const onSubmit = async (data: Input) => {
    const { success, error } = await generateContent(data.topic);
    if (success) {
      await generatePPT(success, data.topic);
    }
  };
  form.watch();

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Topic</FormLabel>
                <FormControl>
                  <Input placeholder="artificial inteligence" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            //   disabled={isLoading}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContentCreationForm;
