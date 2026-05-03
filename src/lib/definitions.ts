import { z } from 'zod'

export const SignupSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters.' })
    .max(30, { message: 'Username must be at most 30 characters.' })
    .regex(/^[a-z0-9-]+$/, { message: 'Only lowercase letters, numbers, and hyphens allowed.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' })
    .trim(),
})

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z.string().min(1, { message: 'Password is required.' }).trim(),
})

export const ProfileUpdateSchema = z.object({
  displayName: z.string().min(1).max(60).trim(),
  bio: z.string().max(160).trim().optional(),
  seoTitle: z.string().max(60).trim().optional(),
  seoDescription: z.string().max(160).trim().optional(),
})

export const LinkSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }).max(100, { message: 'Title is too long' }).trim(),
  url: z.string().url({ message: 'Must be a valid URL' }).trim(),
  icon: z.string().optional(),
  isActive: z.boolean().optional(),
})

export const UsernameSchema = z
  .string()
  .min(3)
  .max(30)
  .regex(/^[a-z0-9-]+$/)
  .trim()

export type FormState =
  | {
      errors?: Record<string, string[]>
      message?: string
      success?: boolean
    }
  | undefined
