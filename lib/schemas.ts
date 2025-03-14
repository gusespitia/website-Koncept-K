import { z } from "zod";

export const formSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters.")
    .max(50),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters.")
    .max(50),
  email: z.string().email("Please enter a valid email address."),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters.")
    .max(1000),
});