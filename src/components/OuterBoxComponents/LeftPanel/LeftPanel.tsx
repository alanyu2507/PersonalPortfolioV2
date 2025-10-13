import React, { useContext } from 'react'
import './CSS/LeftPanel.css'
import { FileContext } from '../../../Contexts/FileContext'
import ComputerFolder from '../../RoomSpecific/Bedroom/ComputerFolder'
import ServerFolder from '../../RoomSpecific/Bedroom/ServerFolder'
import ConsoleFolder from '../../RoomSpecific/Bedroom/ConsoleFolder'
import InitialMessage from '../../RoomSpecific/Bedroom/InitialMessage'
import CloseButton from '../Buttons/CloseButton'

function LeftPanel({ children }: { children: React.ReactNode }) {
  const { folderName, fileName } = useContext(FileContext)
  
  const isVisible = folderName !== ""
  
  return (
    <div className={`LeftPanel ${isVisible ? 'visible' : 'invisible'}`}>
      <div className="LeftPanelTop">
        <div className="LeftPanelTopLeft"></div>
        <div className="LeftPanelTopCenter">{folderName}</div>
        <div className="LeftPanelTopRight">
          <CloseButton />
        </div>
      </div>
      <div className="LeftPanelBottom">
        {(() => {
          switch (folderName) {
            case "InitialMessage":
              return <InitialMessage />
            case "Personal Computer":
              return <ComputerFolder />
            case "Bedroom Server":
                return <ServerFolder />
            case "Bedroom Console":
                return <ConsoleFolder />
            default:
              return null
          }
        })()}
      </div>
    </div>
  )
}

export default LeftPanel
