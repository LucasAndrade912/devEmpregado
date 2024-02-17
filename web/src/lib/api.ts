import axios from 'axios'

export const api = axios.create({
	baseURL: 'https://devempregado.onrender.com:3000/'
})
