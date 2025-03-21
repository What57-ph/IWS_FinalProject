import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-bgColor">
      <p className="uppercase text-green-400 font-bold"> Hello World</p>
      <p className="text-opacity-100 text">Hello world</p>
    </div>
  );
}

export default App;
