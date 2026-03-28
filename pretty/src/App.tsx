import { BrowserRouter } from 'react-router-dom'

import { AppRoutes } from './appRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
