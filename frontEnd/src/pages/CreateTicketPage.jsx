import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createTicket } from '../api/api'
import { useToast } from '../context/ToastContext'
import CreateTicketForm from '../components/forms/CreateTicketForm'

const CreateTicketPage = () => {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (formData) => {
    setLoading(true)
    setError('')
    try {
      await createTicket(formData)
      showToast('Ticket created successfully!', 'success')
      setTimeout(() => navigate('/tickets'), 500)
    } catch (err) {
      setError(err.message)
      showToast(err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">Create New Ticket</h1>
        <p className="text-sm text-slate-600 mt-1">Fill in the details below to open a support ticket</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}
          <CreateTicketForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </div>
    </div>
  )
}

export default CreateTicketPage
