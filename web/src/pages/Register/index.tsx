import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { User, Envelope, LockKey } from '@phosphor-icons/react'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { createUser } from './data'
import { CreateUserFields, createUserSchema } from './validator'

export function Register() {
	const navigate = useNavigate()

	const { mutateAsync: createUserFn, isPending } = useMutation({
		mutationFn: createUser,
	})

	const { register, handleSubmit, formState } = useForm<CreateUserFields>({
		resolver: zodResolver(createUserSchema),
		mode: 'onChange',
	})

	async function handleRegisterUser({ name, email, password }: CreateUserFields) {
		const user = { name, email, password }

		try {
			const response = await createUserFn(user)
			console.log(response)
			navigate('/home')
		} catch (error) {
			console.log(error)
		}
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

			<form className="w-[35.25rem]" onSubmit={handleSubmit(handleRegisterUser)}>
				<div className="input-field flex flex-col gap-4 mb-7">
					<label htmlFor="name" className="text-lg">
						Nome <span className="text-red-500">*</span>
					</label>

					<Input.Root className={errors.name && 'border-red-500'}>
						<Input.Icon>
							<User className={errors.name && 'text-red-500'} />
						</Input.Icon>

						<Input.Field id="name" placeholder="Digite seu nome completo" {...register('name')} />
					</Input.Root>

					{errors.name && (
						<span className="w-full text-right italic text-sm text-red-500">
							{errors.name.message}
						</span>
					)}
				</div>

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

				<div id="passwords" className="grid grid-cols-2 gap-6">
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

					<div className="input-field flex flex-col gap-4">
						<label htmlFor="confirm-password" className="text-lg">
							Confirmar senha <span className="text-red-500">*</span>
						</label>

						<Input.Root className={errors.confirmPassword && 'border-red-500'}>
							<Input.Icon>
								<LockKey className={errors.confirmPassword && 'text-red-500'} />
							</Input.Icon>

							<Input.Field
								id="confirm-password"
								type="password"
								placeholder="********"
								className="min-w-0"
								{...register('confirmPassword')}
							/>
						</Input.Root>

						{errors.confirmPassword && (
							<span className="w-full text-right italic text-sm text-red-500">
								{errors.confirmPassword.message}
							</span>
						)}
					</div>
				</div>

				<Button.Root type="submit" className="mt-10 w-full" isLoading={isPending}>
					<Button.Text>Cadastrar usuário</Button.Text>
				</Button.Root>
			</form>

			<span className="mt-20 text-sm pb-10 2xl:pb-0">
				Já possui conta no (dev)Empregado?{' '}
				<Link to="login" className="font-semibold text-purple-primary underline">
					Clique aqui
				</Link>{' '}
				para se logar
			</span>
		</div>
	)
}
