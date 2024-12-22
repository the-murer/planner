'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoginForm } from '@/components/login_form';
import { signIn } from "next-auth/react";
import { useForm } from 'react-hook-form';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError
  } = useForm();

  const onSubmit = (data: any) => {
    try {
      signIn('credentials', { email: data.email, password: data.password });
    } catch (error) {
      setError('root', { message: 'Erro ao logar' });
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start md:items-center p-8">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          {errors.root && <p className="text-red-500">{errors.root.message}</p>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor="email">Email</Label>
            <Input
              {...register('email')}
              id="email"
              type="email"
              placeholder="Insira seu email"
            />
            <Label htmlFor="password">Senha</Label>
            <Input
              {...register('password')}
              id="password"
              type="password"
              placeholder="Insira sua senha"
            />
            <Button className="w-full mt-4" type="submit">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
