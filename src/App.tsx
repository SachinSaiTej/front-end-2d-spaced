import { useEffect } from 'react'
import './App.css'
import { useUserManager } from './contexts/UserManager'
import CanvasWithUsers from './components/CanvasWithUsers'
import { Furniture } from './types';

function App() {
  // const [count, setCount] = useState(0)

  const {addUser, moveUser} = useUserManager();
  const furnitureObjects: Furniture[] = [
    { id: 'desk1', type: 'desk', x: 100, y: 150, width: 100, height: 60, color: '#8B4513' }, // Brown desk
    { id: 'chair1', type: 'chair', x: 220, y: 150, width: 40, height: 40, color: '#000' },    // Black chair
    { id: 'sofa1', type: 'sofa', x: 300, y: 300, width: 120, height: 60, color: '#808080' }  // Gray sofa
  ];

  useEffect(()=>{
    addUser({ id: '1', x: 100, y: 100, color: 'Red' });
    addUser({ id: '2', x: 200, y: 200, color: 'Green' });
    addUser({ id: '3', x: 250, y: 250, color: 'Black' });

    // const furnitureObjects: Furniture[] = [
    //   { id: 'desk1', type: 'desk', x: 100, y: 150, width: 100, height: 60, color: '#8B4513' }, // Brown desk
    //   { id: 'chair1', type: 'chair', x: 220, y: 150, width: 40, height: 40, color: '#000' },    // Black chair
    //   { id: 'sofa1', type: 'sofa', x: 300, y: 300, width: 120, height: 60, color: '#808080' }  // Gray sofa
    // ];
    

    const handleKeyDown = (event: KeyboardEvent) =>{
      event.preventDefault();
      const speed = 10;
      switch(event.key){
        case 'ArrowUp':
          moveUser('1', 0, -speed, furnitureObjects);
          break;
        case 'ArrowDown':
          moveUser('1', 0, speed, furnitureObjects);
          break;
        case 'ArrowLeft':
          moveUser('1', -speed, 0, furnitureObjects);
          break;
        case 'ArrowRight':
          moveUser('1', speed, 0, furnitureObjects);
          break;
        default:
          break;
      }
    }

    // const interval = setInterval(()=>{
    //   moveUser('1', Math.random() * 800, Math.random() * 600);
    // }, 1000);
    window.addEventListener('keydown', handleKeyDown);

    return ()=>{
      window.removeEventListener('keydown', handleKeyDown);
    };
    
  },[addUser, moveUser]);

  return (
    <>
      <div>
        {/* Hi {count} */}
        <CanvasWithUsers furnitureObjects={furnitureObjects}/>
      </div>
      {/* <CanvasComponent draw={draw} width={400} height={400}/> */}
    </>
  )
}

export default App
