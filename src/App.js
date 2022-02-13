//import { createBrowserHistory } from "history";
import { ProvideAuth } from './hooks/useAuth'
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';


// Views
import Layout from './views/Layout.js'
import Inicio from './views/Inicio.js'
import Client from './views/Client.js'
import Employee from './views/Employee.js'

//const hist = createBrowserHistory()

function App() {
  return (
      <ProvideAuth>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Inicio />} />
                    <Route path="client" element={<Client />}/>
                    <Route path="employee" element={<Employee />}/>
                </Route>
            </Routes>
        </BrowserRouter>
      </ProvideAuth>
  );
}

export default App;
