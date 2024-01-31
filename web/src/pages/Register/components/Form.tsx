import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { Envelope, LockKey, User } from '@phosphor-icons/react'

import { useAuth } from '../../../hooks/useAuth'
import { CreateUserFields, createUserSchema } from '../validator'

import { Button } from '../../../components/Button'
import { FormField } from '../../../components/FormField'

export function Form() {
	const navigate = useNavigate()
	const auth = useAuth()

	const { mutateAsync: createUserFn, isPending } = useMutation({
		mutationFn: auth.signUp,
	})

	const { register, handleSubmit, formState } = useForm<CreateUserFields>({
		resolver: zodResolver(createUserSchema),
		mode: 'onChange',
	})

	async function handleRegisterUser({ name, email, password }: CreateUserFields) {
		const user = { name, email, password }

		try {
			await createUserFn(user)
			navigate('/home')
		} catch (error) {
			console.log(error)
		}
	}

	const { errors } = formState

	return (
		<form className="w-[35.25rem]" onSubmit={handleSubmit(handleRegisterUser)}>
			<FormField
				label="Nome"
				placeholder="Digite seu nome completo"
				icon={<User className={errors.name && 'text-red-500'} />}
				error={errors.name?.message}
				{...register('name')}
			/>

			<FormField
				label="Email"
				type="email"
				placeholder="fula@fulano.com"
				icon={<Envelope className={errors.email && 'text-red-500'} />}
				error={errors.email?.message}
				{...register('email')}
			/>

			<div className="grid grid-cols-2 gap-6">
				<FormField
					label="Senha"
					type="password"
					placeholder="********"
					className="min-w-0"
					icon={<LockKey className={errors.password && 'text-red-500'} />}
					error={errors.password?.message}
					{...register('password')}
				/>

				<FormField
					label="Confirmar senha"
					type="password"
					placeholder="********"
					className="min-w-0"
					icon={<LockKey className={errors.confirmPassword && 'text-red-500'} />}
					error={errors.confirmPassword?.message}
					{...register('confirmPassword')}
				/>
			</div>

			<Button.Root type="submit" className="mt-10 w-full" isLoading={isPending}>
				<Button.Text>Cadastrar usuário</Button.Text>
			</Button.Root>
		</form>
	)
}
