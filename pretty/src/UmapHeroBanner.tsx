import { useEffect, useState } from 'react'

import { UmapViewerShell } from './components/UmapViewerShell'

export function UmapHeroBanner() {
  const [interactive, setInteractive] = useState(false)

  useEffect(() => {
    setInteractive(true)
  }, [])

  return (
    <div className="splash-banner splash-banner--umap">
      <UmapViewerShell variant="hero" interactive={interactive} />
    </div>
  )
}
