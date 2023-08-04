import useLocalStorage from "../hooks/LocalStorage";
import Dashboard from "./Dashboard";
import Login from "./Login";

function App() {

  const [id, setID] = useLocalStorage('id');
  return (
    id ? <Dashboard id={id}/> : <Login onIdSubmit={setID} />
  );
}

export default App;
