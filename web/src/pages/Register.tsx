import { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Envelope, LockKey } from '@phosphor-icons/react'

import { Input } from '../components/Input'
import { Button } from '../components/Button'

export function Register() {
	const navigate = useNavigate()

	function handleRegisterUser(event: FormEvent) {
		event.preventDefault()
		navigate('/home')
	}

	return (
		<div className="w-full h-screen flex items-center flex-col">
			<h1 className="font-title mt-32 text-[4rem]">
				<span className="font-title text-purple-secondary">(dev)</span>Empregado
			</h1>

			<p className="text-center my-12">
				Dificuldade em lembrar de todas as vagas que se candidatou?
				<br /> Cadastre-se e lembresse de todas as suas candidaturas.
			</p>

			<form className="w-[35.25rem]" onSubmit={handleRegisterUser}>
				<div className="input-field flex flex-col gap-4 mb-7">
					<label htmlFor="name" className="text-lg">
						Nome <span className="text-red-500">*</span>
					</label>

					<Input.Root>
						<Input.Icon>
							<User />
						</Input.Icon>

						<Input.Field id="name" placeholder="Digite seu nome completo" />
					</Input.Root>
				</div>

				<div className="input-field flex flex-col gap-4 mb-7">
					<label htmlFor="email" className="text-lg">
						Email <span className="text-red-500">*</span>
					</label>

					<Input.Root>
						<Input.Icon>
							<Envelope />
						</Input.Icon>

						<Input.Field id="email" type="email" placeholder="fula@fulano.com" />
					</Input.Root>
				</div>

				<div id="passwords" className="grid grid-cols-2 gap-6">
					<div className="input-field flex flex-col gap-4">
						<label htmlFor="password" className="text-lg">
							Senha <span className="text-red-500">*</span>
						</label>

						<Input.Root>
							<Input.Icon>
								<LockKey />
							</Input.Icon>

							<Input.Field
								id="password"
								type="password"
								placeholder="********"
								className="min-w-0"
							/>
						</Input.Root>
					</div>

					<div className="input-field flex flex-col gap-4">
						<label htmlFor="confirm-password" className="text-lg">
							Confirmar senha <span className="text-red-500">*</span>
						</label>

						<Input.Root>
							<Input.Icon>
								<LockKey />
							</Input.Icon>

							<Input.Field
								id="confirm-password"
								type="password"
								placeholder="********"
								className="min-w-0"
							/>
						</Input.Root>
					</div>
				</div>

				<Button.Root type="submit" className="mt-10 w-full">
					<Button.Text>Cadastrar usuário</Button.Text>
				</Button.Root>
			</form>

			<span className="mt-20 text-sm">
				Já possui conta no (dev)Empregado?{' '}
				<Link to="login" className="font-semibold text-purple-primary underline">
					Clique aqui
				</Link>{' '}
				para se logar
			</span>
		</div>
	)
}
