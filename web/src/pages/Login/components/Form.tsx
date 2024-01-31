import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { Envelope, LockKey } from '@phosphor-icons/react'

import { LoginUserFields, loginUserSchema } from '../validator'

import { Button } from '../../../components/Button'
import { FormField } from '../../../components/FormField'

export function Form() {
	const navigate = useNavigate()
	const auth = useAuth()

	const { mutateAsync: loginFn, isPending } = useMutation({
		mutationFn: auth.signIn,
	})

	const { register, handleSubmit, formState } = useForm<LoginUserFields>({
		mode: 'onChange',
		resolver: zodResolver(loginUserSchema),
	})

	async function handleLoginUser({ email, password }: LoginUserFields) {
		try {
			await loginFn({ email, password })
			navigate('/home')
		} catch (error) {
			console.log(error)
		}
	}

	const { errors } = formState

	return (
		<form className="w-[35.25rem]" onSubmit={handleSubmit(handleLoginUser)}>
			<FormField
				label="Email"
				type="email"
				placeholder="fula@fulano.com"
				icon={<Envelope className={errors.email && 'text-red-500'} />}
				error={errors.email?.message}
				{...register('email')}
			/>

			<FormField
				label="Senha"
				type="password"
				placeholder="********"
				className="min-w-0"
				icon={<LockKey className={errors.password && 'text-red-500'} />}
				error={errors.password?.message}
				{...register('password')}
			/>

			<Button.Root type="submit" className="mt-10 w-full" isLoading={isPending}>
				<Button.Text>Acessar plataforma</Button.Text>
			</Button.Root>
		</form>
	)
}
