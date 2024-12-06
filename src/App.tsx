import { useEffect } from 'react'
import './App.css'
import { useUserManager } from './contexts/UserManager'
import CanvasWithUsers from './components/CanvasWithUsers'

function App() {
  // const [count, setCount] = useState(0)

  const {addUser, moveUser} = useUserManager();

  useEffect(()=>{
    addUser({ id: '1', x: 100, y: 100, color: 'Red' });
    addUser({ id: '2', x: 200, y: 200, color: 'Green' });

    const handleKeyDown = (event: KeyboardEvent) =>{
      event.preventDefault();
      const speed = 10;
      switch(event.key){
        case 'ArrowUp':
          moveUser('1', 0, -speed);
          break;
        case 'ArrowDown':
          moveUser('1', 0, speed);
          break;
        case 'ArrowLeft':
          moveUser('1', -speed, 0);
          break;
        case 'ArrowRight':
          moveUser('1', speed, 0);
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
        <CanvasWithUsers />
      </div>
      {/* <CanvasComponent draw={draw} width={400} height={400}/> */}
    </>
  )
}

export default App
