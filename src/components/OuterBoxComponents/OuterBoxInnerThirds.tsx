import React from 'react'
import './OuterBoxInnerThirds.css'

function OuterBoxInnerThirds({ children }: { children: React.ReactNode }) {
  return (
    <div className="outerBoxInnerThirds">
      {children}
    </div>
  )
}

export default OuterBoxInnerThirds
