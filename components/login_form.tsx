import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import React from 'react'

export const LoginForm = () => {


  return (
    <div className='flex flex-col gap-2 '>
      <Label htmlFor="email">Email</Label>
      <Input className='bg-red' id="email" type="email" placeholder="Insira seu email" />
      <Label htmlFor="password">Senha</Label>
      <Input id="password" type="password" placeholder="Insira sua senha" />
      <Button>Login</Button>
    </div>
  )
}
