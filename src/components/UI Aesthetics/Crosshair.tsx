import React, { useContext, useEffect } from 'react'
import './CSS/Crosshair.css'
import { CameraContext } from '../../Contexts/CameraContext'
import { FileContext } from '../../Contexts/FileContext'

function Crosshair({ children }: { children: React.ReactNode }) {
  const { hoveredObject } = useContext(CameraContext)
  const { setFolderName, folderName } = useContext(FileContext)
  
  const isHovered = hoveredObject.includes('hover')
  
  const objectMap: { [key: string]: string } = {
    'KB3D_LAB_Computer_A_Mainhover': 'Personal Computer',
    'KB3D_LAB_Server_C_Mainhover': 'Bedroom Server',
    'KB3D_LAB_Console_B_Mainhover': 'Bedroom Console'
  }
  
  const handleClick = () => {
    if (isHovered) {
      const mappedValue = objectMap[hoveredObject]
      if (mappedValue) {
        setFolderName(mappedValue)
      }
    }
  }
  
  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      // Ignore clicks on buttons or other interactive elements
      const target = event.target as HTMLElement
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        return
      }
      handleClick()
    }
    
    document.addEventListener('click', handleGlobalClick)
    
    return () => {
      document.removeEventListener('click', handleGlobalClick)
    }
  }, [isHovered, hoveredObject])
  
  return (
    <div 
      className={isHovered ? 'Hovered' : 'Crosshair'}
    >
      {children}
    </div>
  )
}

export default Crosshair
