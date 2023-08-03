import Login from "./Login";

import {useState} from "react";

function App() {

  const [id, setID] = useState();
  return (
    <>
      {id}
      <Login onIdSubmit={setID} />
      
    </>
    
  );
}

export default App;
