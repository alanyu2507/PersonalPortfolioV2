import TestRoomCanvas from './components/TestRoom'
import OuterBox from './components/OuterBox'
import Crosshair from './components/UI Aesthetics/Crosshair'
import XYCoordinates from './components/UI Aesthetics/XYCoordinates'
import OuterBoxInnerThirds from './components/OuterBoxComponents/OuterBoxInnerThirds'
import LeftPanel from './components/OuterBoxComponents/LeftPanel/LeftPanel'
import RightPanel from './components/OuterBoxComponents/RightPanel/RightPanel'


function App() {
  return (
    <div>
      <TestRoomCanvas />
      <OuterBox>
        <OuterBoxInnerThirds>
          <LeftPanel>
            <div></div>
          </LeftPanel>
        </OuterBoxInnerThirds>
        <OuterBoxInnerThirds>
          <div></div>
        </OuterBoxInnerThirds>
        <OuterBoxInnerThirds>
          <RightPanel>
            <div></div>
          </RightPanel>
        </OuterBoxInnerThirds>
      </OuterBox>
      <Crosshair>
        <div></div>
      </Crosshair>
      <XYCoordinates>
        <div></div>
      </XYCoordinates>
    </div>
  )
}

export default App
