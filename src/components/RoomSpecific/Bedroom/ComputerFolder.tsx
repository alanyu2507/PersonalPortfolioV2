import React, { useContext } from 'react'
import '../RoomSpecficBottomPanel.css'

function ComputerFolder({ children }: { children?: React.ReactNode }) {
  
  return (
    <div className='RoomSpecficBottomPanel'>
        This is the Computer Folder
      {children}
    </div>
  )
}

export default ComputerFolder
