import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import route from './routes/route'
import './index.css'
import { ToastContainer } from 'react-toastify'
createRoot(document.getElementById('root')).render(
  <>
  <RouterProvider router={route} /> 
  <ToastContainer />
  </>
)
