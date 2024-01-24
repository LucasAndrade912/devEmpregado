import { User } from './entities/user'
import { Job } from './entities/job'

import { UserRepository } from './repositories/user/repository'
import { JobRepository } from './repositories/job/repository'

export async function runSeed() {
	const userRepository = new UserRepository()
	const jobRepository = new JobRepository()

	const user1 = await User.build('Alice Johnson', 'alice@email.com', 'password123')
	const user2 = await User.build('Bob Smith', 'bob@email.com', 'securePass')
	const user3 = await User.build('Charlie Brown', 'charlie@email.com', 'brownie1')
	const user4 = await User.build('Diana Rodriguez', 'diana@email.com', 'diana123')
	const user5 = await User.build('Ethan Williams', 'ethan@email.com', 'ethanPass')

	const userId1 = await userRepository.create(user1)
	const userId2 = await userRepository.create(user2)
	const userId3 = await userRepository.create(user3)
	await userRepository.create(user4)
	const userId5 = await userRepository.create(user5)

	await jobRepository.create(userId1, new Job({
		company: 'XYZ Corp',
		role: 'Data Analyst',
		modality: 'Presencial',
		contract: 'PJ',
		salary: 50000,
		status: 'Encerrada',
		job_url: 'https://job2-url.com'
	}))

	await jobRepository.create(userId1, new Job({
		company: 'Tech Innovators',
		role: 'UX Designer',
		modality: 'Híbrido',
		contract: 'CLT',
		salary: 35000,
		status: 'Efetivado',
		job_url: 'https://job3-url.com'
	}))

	await jobRepository.create(userId1, new Job({
		company: 'Global Solutions',
		role: 'Project Manager',
		modality: 'Presencial',
		contract: 'CLT',
		salary: 90000,
		status: 'Andamento',
		job_url: 'https://job4-url.com'
	}))

	await jobRepository.create(userId1, new Job({
		company: 'Digital Marketing Co.',
		role: 'Social Media Specialist',
		modality: 'Remoto',
		contract: 'PJ',
		salary: 55000,
		status: 'Encerrada',
		job_url: 'https://job5-url.com'
	}))

	await jobRepository.create(userId2, new Job({
		company: 'E-commerce Hub',
		role: 'Customer Support Representative',
		modality: 'Híbrido',
		contract: 'CLT',
		salary: 30000,
		status: 'Andamento',
		job_url: 'https://job6-url.com'
	}))

	await jobRepository.create(userId2, new Job({
		company: 'Innovate Labs',
		role: 'Research Scientist',
		modality: 'Presencial',
		contract: 'CLT',
		salary: 95000,
		status: 'Efetivado',
		job_url: 'https://job7-url.com'
	}))

	await jobRepository.create(userId2, new Job({
		company: 'Health Wellness Inc.',
		role: 'Nutritionist',
		modality: 'Remoto',
		contract: 'PJ',
		salary: 40000,
		status: 'Encerrada',
		job_url: 'https://job8-url.com'
	}))

	await jobRepository.create(userId3, new Job({
		company: 'Green Energy Solutions',
		role: 'Environmental Engineer',
		modality: 'Híbrido',
		contract: 'CLT',
		salary: 85000,
		status: 'Andamento',
		job_url: 'https://job9-url.com'
	}))

	await jobRepository.create(userId3, new Job({
		company: 'Finance Wizards',
		role: 'Financial Analyst',
		modality: 'Presencial',
		contract: 'PJ',
		salary: 32000,
		status: 'Efetivado',
		job_url: 'https://job10-url.com'
	}))

	await jobRepository.create(userId3, new Job({
		company: 'Artistic Creations',
		role: 'Graphic Designer',
		modality: 'Remoto',
		contract: 'CLT',
		salary: 48000,
		status: 'Andamento',
		job_url: 'https://job11-url.com'
	}))

	await jobRepository.create(userId5, new Job({
		company: 'Travel Adventures Ltd.',
		role: 'Travel Consultant',
		modality: 'Híbrido',
		contract: 'CLT',
		salary: 70000,
		status: 'Encerrada',
		job_url: 'https://job12-url.com'
	}))

	await jobRepository.create(userId5, new Job({
		company: 'Sports Gear Co.',
		role: 'Fitness Trainer',
		modality: 'Presencial',
		contract: 'CLT',
		salary: 38000,
		status: 'Andamento',
		job_url: 'https://job13-url.com'
	}))
}
