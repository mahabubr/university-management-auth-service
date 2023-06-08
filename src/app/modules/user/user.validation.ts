import { z } from 'zod';

// Request Validation
const createUserZodSchema = z.object({
  body: z.object({
    user: z.object({
      role: z.string({
        required_error: 'role is Required',
      }),
    }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};
