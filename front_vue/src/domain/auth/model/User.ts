export interface User {
    id: number;
    username: string;
    password: string;
}

import {z} from 'zod';

export const UserSchema = z.object({
    id: z.number().positive().optional(),
    username: z.string().min(8),
    password: z.string().min(8),
});