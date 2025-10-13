import React, { useContext, useEffect, useRef } from 'react'
import { FileContext } from '../../../Contexts/FileContext'

function CloseButton() {
  const { setFolderName } = useContext(FileContext)
  const buttonRef = useRef<HTMLButtonElement>(null)
  
  const handleClick = (event?: any) => {
    setFolderName("")
  }
  
  const handleClickReact = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    handleClick()
  }
  
  
  return (
    <button 
      ref={buttonRef}
      onClick={handleClickReact}
      style={{
        width: '100%',
        height: '100%',
        border: '1px solid white',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '16px',
        fontWeight: 'bold',
        color: 'white',
        zIndex: 9999,
        position: 'relative',
        pointerEvents: 'auto'
      }}
    >
      ×
    </button>
  )
}

export default CloseButton
