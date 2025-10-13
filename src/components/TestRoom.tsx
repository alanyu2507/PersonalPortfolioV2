import { useEffect, Suspense, useState, useRef, useContext } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Html } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { CameraContext } from '../Contexts/CameraContext'
import { FileContext } from '../Contexts/FileContext'

function Model({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} />;
}


function CameraController() {
  const { camera, scene } = useThree()
  const { setHoveredObject } = useContext(CameraContext)
  const { setXCoordinate, setYCoordinate } = useContext(CameraContext)
  const { folderName } = useContext(FileContext)
  const [, setZoomLevel] = useState(5) // Initial zoom level
  const minZoom = 1 // Minimum zoom (closer)
  const maxZoom = 20 // Maximum zoom (further)
  const zoomSpeed = 0.5 // How fast zoom changes
  
  // Cursor-based offsets for X and Y
  const cursorOffsets = useRef({ x: 0, y: 0 })
  // Smooth interpolated values for camera movement
  const smoothOffsets = useRef({ x: 0, y: 0 })
  // Final look-at point after normalization
  const finalLookAtPoint = useRef(new THREE.Vector3())
  // Raycaster for object detection
  const raycaster = useRef(new THREE.Raycaster())

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1

      // Only update coordinates if folderName is not empty
      if (folderName == "") {
        setXCoordinate(x)
        setYCoordinate(y)
        // Calculate cursor-based offsets
        const offsetX = x * 0.5 // -0.5 to +0.5 meters range
        const offsetY = y * 1 // -0.5 to +0.5 meters range
        
        // Update cursor offsets
        cursorOffsets.current.x = offsetX
        cursorOffsets.current.y = -offsetY
      }
    }

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault()
      const delta = event.deltaY > 0 ? zoomSpeed : -zoomSpeed
      setZoomLevel(prev => {
        const newZoom = prev + delta
        return Math.max(minZoom, Math.min(maxZoom, newZoom))
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('wheel', handleWheel, { passive: false })
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('wheel', handleWheel)
    }
  }, [zoomSpeed, minZoom, maxZoom, folderName])

  useFrame(() => {
    // Smooth interpolation towards target cursor offsets
    const lerpFactor = 0.05 // Adjust for smoother/faster movement
    smoothOffsets.current.x += (cursorOffsets.current.x - smoothOffsets.current.x) * lerpFactor
    smoothOffsets.current.y += (cursorOffsets.current.y - smoothOffsets.current.y) * lerpFactor
    
    // Calculate azimuth (horizontal) and elevation (vertical) angles from smooth offsets
    const azimuth = -smoothOffsets.current.x * Math.PI // Negate for correct direction
    const elevation = smoothOffsets.current.y * Math.PI * 0.5 // -π/2 to +π/2 for vertical rotation
    
    // Calculate look-at point using spherical coordinates
    // Start with forward direction (0, 0, -1) in camera space
    const lookDirection = new THREE.Vector3(0, 0, 1)
    
    // Apply elevation rotation (around X axis)
    lookDirection.applyAxisAngle(new THREE.Vector3(1, 0, 0), elevation)
    
    // Apply azimuth rotation (around Y axis)
    lookDirection.applyAxisAngle(new THREE.Vector3(0, 1, 0), azimuth)
    
    // Scale to 1 meter distance
    lookDirection.multiplyScalar(1)
    
    // Transform to world space and add to camera position
    finalLookAtPoint.current.copy(camera.position).add(lookDirection)
    
    // Make camera look at the calculated point
    camera.lookAt(finalLookAtPoint.current)
    
    // Perform raycasting from camera in look direction
    const cameraDirection = new THREE.Vector3()
    camera.getWorldDirection(cameraDirection)
    
    raycaster.current.set(camera.position, cameraDirection)
    const intersects = raycaster.current.intersectObjects(scene.children, true)
    
    // Check if raycast hit anything
    if (intersects.length > 0) {
      const hitObject = intersects[0].object
      const objectName = hitObject.name || hitObject.parent?.name || 'Unnamed Object'
      
      setHoveredObject(objectName)
    } else {
      // No object hit, reset hovered object
      setHoveredObject("None")
    }
    
    // Apply zoom by adjusting camera position
    /*const basePosition = [0, 2, zoomLevel] as [number, number, number]
    camera.position.x += (basePosition[0] - camera.position.x) * 0.05
    camera.position.y += (basePosition[1] - camera.position.y) * 0.05
    camera.position.z += (basePosition[2] - camera.position.z) * 0.05*/
  })

  return null
}

function TestRoomCanvas() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh", 
        position: "fixed",
        margin: "0", 
        top: "0", 
        left: "0"
      }}
    >
      <Canvas
        camera={{ position: [0, 2.5, -3.6] }}
        gl={{ antialias: true }}
        style={{
          width: '100%',
          height: '100%',
        }}
        shadows
      >
        {/* Log camera transforms */}
        
        <ambientLight intensity={1.5} />
        <directionalLight
          color="rgba(255, 255, 255, 1)"
          position={[0, 1000, 0]}
          intensity={0.5}
          castShadow
        />

        <Suspense fallback={<Html center>Loading model...</Html>}>
          <Model modelPath="/PersonalPortfolioV2/models/Bedroom.glb" />
          
        </Suspense>
        
        <CameraController />

        <EffectComposer>
          <Bloom
            luminanceThreshold={0.3}
            luminanceSmoothing={0.5}
            intensity={1.2}
            radius={0.5}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

export default TestRoomCanvas
