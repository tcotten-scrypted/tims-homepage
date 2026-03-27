import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { UxComponentsDebugPage } from './debug/UxComponentsDebugPage'
import { DemoPalette1Page } from './demo/DemoPalette1Page'
import HomePage from './pages/HomePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/demo" element={<Navigate to="/demo/palette-1" replace />} />
        <Route path="/demo/palette-1" element={<DemoPalette1Page />} />
        <Route path="/debug/ux-components" element={<UxComponentsDebugPage />} />
      </Routes>
    </BrowserRouter>
  )
}
