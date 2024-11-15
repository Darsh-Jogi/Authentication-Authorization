import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import { router } from '../routes/routes.jsx'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Store } from '../redux/store.js'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
