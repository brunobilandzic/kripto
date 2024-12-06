import "./App.css";
import { useState, useEffect } from "react";
import { getBlockchainInfo } from "./services/bitcoin";

function App() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
   getBlockchainInfo().then((data) => {
      setInfo(data);
    });
  }, [info]);

  return (
    <div className="mt-2 ml-1">
      <div className="  text-green-800 text-xl font-extrabold">
        Bitcon Core API
      </div>
      {JSON.stringify(info)}
    </div>
  );
}

export default App;
