import { ContactsProvider } from "../contexts/ContactsProvider";
import { ConversationsProvider } from '../contexts/ConversationsProvider';
import useLocalStorage from "../hooks/LocalStorage";
import Dashboard from "./Dashboard";
import Login from "./Login";

function App() {

  const [id, setID] = useLocalStorage('id');
  
  const dashboard = (
    <ContactsProvider>
      <ConversationsProvider>
        <Dashboard id={id}/> 
      </ConversationsProvider>
    </ContactsProvider>
  )
  
  return (
    id ? dashboard : <Login onIdSubmit={setID} />
  );
}

export default App;
