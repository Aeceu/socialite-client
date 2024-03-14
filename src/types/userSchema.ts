import { z } from "zod";

export const userSignupSchema = z.object({
  first_name: z
    .string()
    .min(2, "First name must be atleast 2 characters")
    .max(45, "First name must be less than 45 characters")
    .regex(new RegExp("^[a-zA-Z]+$"), "No special character allowed"),
  last_name: z
    .string()
    .min(2, "Last name must be atleast 2 characters")
    .max(45, "Last name must be less than 45 characters")
    .regex(new RegExp("^[a-zA-Z]+$"), "No special character allowed"),
  email: z.string().email("Invalid Email"),
  password: z
    .string()
    .min(6, "Password must be atleast 6 characters")
    .max(50, "Password must be less than 50 characters"),
});

export const userLoginSchema = z.object({
  email: z.string().email("Invalid Email"),
  password: z
    .string()
    .min(6, "Password must be atleast 6 characters")
    .max(50, "Password must be less than 50 characters"),
});
