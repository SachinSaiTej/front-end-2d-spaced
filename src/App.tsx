import { useEffect } from "react";
import "./App.css";
import { useUserManager } from "./contexts/UserManager";
import CanvasWithUsers from "./components/CanvasWithUsers";
import { Furniture } from "./types";

function App() {
  // const [count, setCount] = useState(0)

  const { addUser, moveUser } = useUserManager();
  const furnitureObjects: Furniture[] = [
    {
      id: "desk1",
      type: "desk",
      x: 100,
      y: 150,
      width: 100,
      height: 60,
      color: "#8B4513",
    }, // Brown desk
    {
      id: "chair1",
      type: "chair",
      x: 220,
      y: 150,
      width: 40,
      height: 40,
      color: "#000",
    }, // Black chair
    {
      id: "sofa1",
      type: "sofa",
      x: 300,
      y: 300,
      width: 120,
      height: 60,
      color: "#808080",
    }, // Gray sofa
  ];

  useEffect(() => {
    addUser({
      id: "1",
      x: 100,
      y: 100,
      color: "Red",
      character: "/assets/AvatarImages/userAvatar.png",
      direction: "south",
      movementState: "facing-still",
    });
    addUser({
      id: "2",
      x: 200,
      y: 100,
      color: "Green",
      character:"/assets/AvatarImages/userAvatar.png",
      direction: "south",
      movementState: "facing-still",
    });
    addUser({
      id: "3",
      x: 300,
      y: 100,
      color: "Black",
      character: "/assets/AvatarImages/userAvatar.png",
      direction: "south",
      movementState: "facing-still",
    });

    // const furnitureObjects: Furniture[] = [
    //   { id: 'desk1', type: 'desk', x: 100, y: 150, width: 100, height: 60, color: '#8B4513' }, // Brown desk
    //   { id: 'chair1', type: 'chair', x: 220, y: 150, width: 40, height: 40, color: '#000' },    // Black chair
    //   { id: 'sofa1', type: 'sofa', x: 300, y: 300, width: 120, height: 60, color: '#808080' }  // Gray sofa
    // ];

    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      const speed = 10;
      switch (event.key) {
        case "ArrowUp":
          moveUser("1", 0, -speed, furnitureObjects, "north");
          break;
        case "ArrowDown":
          moveUser("1", 0, speed, furnitureObjects, "south");
          break;
        case "ArrowLeft":
          moveUser("1", -speed, 0, furnitureObjects, "west");
          break;
        case "ArrowRight":
          moveUser("1", speed, 0, furnitureObjects, "east");
          break;
        default:
          break;
      }
    };

    // const interval = setInterval(()=>{
    //   moveUser('1', Math.random() * 800, Math.random() * 600);
    // }, 1000);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [addUser, moveUser]);

  return (
    <div>
      <div>
        <img src="/assets/AvatarImages/south-facing-still.png"></img>
      </div>
      <CanvasWithUsers furnitureObjects={furnitureObjects} />
      {/* <CanvasComponent draw={draw} width={400} height={400}/> */}
    </div>
  );
}

export default App;
