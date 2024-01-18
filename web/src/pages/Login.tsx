import { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Envelope, LockKey } from '@phosphor-icons/react'

import { Input } from '../components/Input'
import { Button } from '../components/Button'

export function Login() {
	const navigate = useNavigate()

	function handleLoginUser(event: FormEvent) {
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

			<form className="w-[35.25rem]" onSubmit={handleLoginUser}>
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

				<div className="input-field flex flex-col gap-4">
					<label htmlFor="password" className="text-lg">
						Senha <span className="text-red-500">*</span>
					</label>

					<Input.Root>
						<Input.Icon>
							<LockKey />
						</Input.Icon>

						<Input.Field id="password" type="password" placeholder="********" className="min-w-0" />
					</Input.Root>
				</div>

				<Button.Root type="submit" className="mt-10 w-full">
					<Button.Text>Acessar plataforma</Button.Text>
				</Button.Root>
			</form>

			<span className="mt-20 text-sm">
				Ainda não possui conta no (dev)Empregado?{' '}
				<Link to="/" className="font-semibold text-purple-primary underline">
					Clique aqui
				</Link>{' '}
				para se registrar
			</span>
		</div>
	)
}
