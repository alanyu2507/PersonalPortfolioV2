import TestRoomCanvas from './components/TestRoom'
import OuterBox from './components/OuterBox'
import Crosshair from './components/UI Aesthetics/Crosshair'
import XYCoordinates from './components/UI Aesthetics/XYCoordinates'
import OuterBoxInnerThirds from './components/OuterBoxComponents/OuterBoxInnerThirds'
import LeftPanel from './components/OuterBoxComponents/LeftPanel/LeftPanel'


function App() {
  return (
    <div>
      <TestRoomCanvas />
      <OuterBox>
        <OuterBoxInnerThirds>
          <LeftPanel>
            <div>Left Panel Content</div>
          </LeftPanel>
        </OuterBoxInnerThirds>
        <OuterBoxInnerThirds>
          <div>Middle Panel Content</div>
        </OuterBoxInnerThirds>
        <OuterBoxInnerThirds>
          <div>Right Panel Content</div>
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
