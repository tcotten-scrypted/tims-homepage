import { Navigate, Route, Routes } from 'react-router-dom'

import { UxComponentsDebugPage } from './debug/UxComponentsDebugPage'
import { DemoPalette1Page } from './demo/DemoPalette1Page'
import HomePage from './pages/HomePage'
import LatestUpdatesPage from './pages/LatestUpdatesPage'
import UmapViewerPage from './pages/UmapViewerPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/latest" element={<LatestUpdatesPage />} />
      <Route path="/updates" element={<LatestUpdatesPage />} />
      <Route path="/demo" element={<Navigate to="/demo/palette-1" replace />} />
      <Route path="/demo/palette-1" element={<DemoPalette1Page />} />
      <Route path="/debug/ux-components" element={<UxComponentsDebugPage />} />
      <Route
        path="/research/tokens/llama-8b-token-3d-viewer"
        element={<UmapViewerPage />}
      />
      <Route
        path="/research/tokens/llama-8b-token-3d-viewer/"
        element={<UmapViewerPage />}
      />
    </Routes>
  )
}
