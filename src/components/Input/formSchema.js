import { z } from 'zod';

export const formSchema = z
  .object({
    name: z.string().min(3, { message: 'Mínimo 3 carácteres.' }).toLowerCase(),
    email: z.string().email({ message: 'E-mail inválido.' }).toLowerCase(),
    password: z
      .string()
      .min(8, { message: 'Senha deve ter no mínimo 8 carácteres.' })
      .regex(/(?=.*?[A-Z])/, 'É necessário pelo menos uma letra maiúscula')
      .regex(/(?=.*?[a-z])/, 'É necessário pelo menos uma letra minúscula')
      .regex(/(?=.*?[0-9])/, 'É necessário pelo menos um número')
      .regex(
        /(?=.*?[#?!@$%^&*-])/,
        'É necessário pelo menos um caráctere especial',
      ),

    confirmpassword: z.string(),
    bio: z
      .string()
      .min(10, { message: 'Mínimo 10 carácteres.' })
      .max(100, { message: 'Máximo 100 carácteres' }),
    contact: z
      .string()
      .max(11, { message: 'Máximo 11 carácteres' })
      .min(11, { message: 'Mínimo 11 carácteres' }),
    course_module: z.string(),
  })
  .refine((fields) => fields.password === fields.confirmpassword, {
    path: ['confirmpassword'],
    message: 'As senhas não coincidem',
  });
