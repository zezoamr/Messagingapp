import { ContactsProvider } from "../contexts/ContactsProvider";
import { ConversationsProvider } from '../contexts/ConversationsProvider';
import { SocketProvider } from '../contexts/SocketProvider';
import useLocalStorage from "../hooks/LocalStorage";
import Dashboard from "./Dashboard";
import Login from "./Login";

function App() {

  const [id, setID] = useLocalStorage('id');

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  )

  return (
    id ? dashboard : <Login onIdSubmit={setID} />
  );
}

export default App;
