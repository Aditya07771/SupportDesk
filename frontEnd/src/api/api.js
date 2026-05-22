import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.log(`${config.method.toUpperCase()} ${config.url}`)
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred'
    return Promise.reject(new Error(message))
  }
)

export const createTicket = (data) => api.post('/api/tickets', data)

export const getTickets = (params) => api.get('/api/tickets', { params })

export const getTicketById = (ticketId) => api.get(`/api/tickets/${ticketId}`)

export const updateTicket = (ticketId, data) => api.put(`/api/tickets/${ticketId}`, data)

export const getStats = () => api.get('/api/stats')

export default api
