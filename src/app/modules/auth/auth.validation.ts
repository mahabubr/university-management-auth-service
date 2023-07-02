import { z } from 'zod';

const loginZodSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'ID is requires',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is requires',
    }),
  }),
});

const changePasswordZodSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old Password is requires',
    }),
    newPassword: z.string({
      required_error: 'New Password is requires',
    }),
  }),
});


export const AuthValidation = {
  loginZodSchema,
  refreshTokenZodSchema,
  changePasswordZodSchema,
};
