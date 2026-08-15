import { useEffect, useState } from 'react'

import { UmapViewerShell } from '../components/UmapViewerShell'

export default function UmapViewerPage() {
  const [interactive, setInteractive] = useState(false)

  useEffect(() => {
    setInteractive(true)
  }, [])

  return (
    <div className="umap-viewer-page">
      <div className="splash-banner splash-banner--umap splash-banner--fullscreen">
        <UmapViewerShell variant="fullscreen" interactive={interactive} />
      </div>
    </div>
  )
}
