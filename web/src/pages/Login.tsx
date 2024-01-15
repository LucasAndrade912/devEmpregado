import { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Envelope, LockKey } from '@phosphor-icons/react'

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

					<div className="input border border-black-border px-3 py-[10px] flex items-center gap-3 rounded">
						<Envelope size={20} color="#2F2F2F" />

						<input
							id="email"
							type="email"
							placeholder="fula@fulano.com"
							className="flex-1 placeholder:text-[#797979] outline-none"
						/>
					</div>
				</div>

				<div className="input-field flex flex-col gap-4">
					<label htmlFor="password" className="text-lg">
						Senha <span className="text-red-500">*</span>
					</label>

					<div className="input border border-black-border px-3 py-[10px] flex items-center gap-3 rounded">
						<LockKey size={20} color="#2F2F2F" />

						<input
							id="password"
							type="password"
							placeholder="********"
							className="min-w-0 flex-1 placeholder:text-[#797979] outline-none"
						/>
					</div>
				</div>

				<button
					type="submit"
					className="mt-10 w-full flex justify-center items-center bg-purple-primary text-white uppercase py-[14px] rounded-lg hover:bg-purple-hover transition-colors">
					Acessar plataforma
				</button>
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
