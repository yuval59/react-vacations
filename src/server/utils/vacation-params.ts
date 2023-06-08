import { z } from 'zod'

export const vacationCreationParams = z.object({
  description: z.string().optional(),
  picture: z.string().url().optional(),
  price: z.number().optional(),
  destination: z.string(),
  start_date: z.string(),
  end_date: z.string(),
})

export const vacationUpdateParams = z.object({
  description: z.string().optional(),
  picture: z.string().url().optional(),
  price: z.number().optional(),
  destination: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  id: z.string(),
})
