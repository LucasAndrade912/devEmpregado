import { Link } from 'react-router-dom'

import { Form } from './components/Form'

export function Login() {
	return (
		<div className="w-full h-screen flex items-center flex-col">
			<h1 className="font-title mt-20 2xl:mt-32 text-[4rem]">
				<span className="font-title text-purple-secondary">(dev)</span>Empregado
			</h1>
			<p className="text-center my-12">
				Dificuldade em lembrar de todas as vagas que se candidatou?
				<br /> Cadastre-se e lembresse de todas as suas candidaturas.
			</p>

			<Form />

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
