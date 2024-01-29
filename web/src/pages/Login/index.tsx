import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { Envelope, LockKey } from '@phosphor-icons/react'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { loginUserSchema, LoginUserFields } from './validator'

export function Login() {
	const navigate = useNavigate()

	const { register, handleSubmit, formState } = useForm<LoginUserFields>({
		mode: 'onChange',
		resolver: zodResolver(loginUserSchema),
	})

	function handleLoginUser(data: LoginUserFields) {
		console.log(data)
		navigate('/home')
	}

	const { errors } = formState

	return (
		<div className="w-full h-screen flex items-center flex-col">
			<h1 className="font-title mt-20 2xl:mt-32 text-[4rem]">
				<span className="font-title text-purple-secondary">(dev)</span>Empregado
			</h1>
			<p className="text-center my-12">
				Dificuldade em lembrar de todas as vagas que se candidatou?
				<br /> Cadastre-se e lembresse de todas as suas candidaturas.
			</p>

			<form className="w-[35.25rem]" onSubmit={handleSubmit(handleLoginUser)}>
				<div className="input-field flex flex-col gap-4 mb-7">
					<label htmlFor="email" className="text-lg">
						Email <span className="text-red-500">*</span>
					</label>

					<Input.Root className={errors.email && 'border-red-500'}>
						<Input.Icon>
							<Envelope className={errors.email && 'text-red-500'} />
						</Input.Icon>

						<Input.Field
							id="email"
							type="email"
							placeholder="fula@fulano.com"
							{...register('email')}
						/>
					</Input.Root>

					{errors.email && (
						<span className="w-full text-right italic text-sm text-red-500">
							{errors.email.message}
						</span>
					)}
				</div>

				<div className="input-field flex flex-col gap-4">
					<label htmlFor="password" className="text-lg">
						Senha <span className="text-red-500">*</span>
					</label>

					<Input.Root className={errors.password && 'border-red-500'}>
						<Input.Icon>
							<LockKey className={errors.password && 'text-red-500'} />
						</Input.Icon>

						<Input.Field
							id="password"
							type="password"
							placeholder="********"
							className="min-w-0"
							{...register('password')}
						/>
					</Input.Root>

					{errors.password && (
						<span className="w-full text-right italic text-sm text-red-500">
							{errors.password.message}
						</span>
					)}
				</div>

				<Button.Root type="submit" className="mt-10 w-full">
					<Button.Text>Acessar plataforma</Button.Text>
				</Button.Root>
			</form>

			<span className="mt-20 text-sm pb-10 2xl:pb-0">
				Ainda não possui conta no (dev)Empregado?{' '}
				<Link to="/" className="font-semibold text-purple-primary underline">
					Clique aqui
				</Link>{' '}
				para se registrar
			</span>
		</div>
	)
}
