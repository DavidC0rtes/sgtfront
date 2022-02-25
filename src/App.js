//import { createBrowserHistory } from "history";
import { ProvideAuth } from './hooks/useAuth'
import { ProvideTurn } from './hooks/useTurn'
import {
    BrowserRouter,
    Routes,
    Route,
    Outlet,
} from 'react-router-dom';


// Views
import Layout from './views/Layout.js'
import Inicio from './views/Inicio.js'
import Client from './views/Client.js'
import Employee from './views/Employee.js'
import Dashboard from './views/Dashboard.js'
import NoMatch from './views/NoMatch'
import ClientTurn from './views/ClientTurn'

//const hist = createBrowserHistory()

function App() {
  return (
      <ProvideAuth>
      <ProvideTurn>
        <BrowserRouter>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<Inicio />} />
                    <Route path="client" element={<Outlet />}>
                        <Route index element={<Client />}/>
                        <Route path="turn" element={<ClientTurn />}/>
                    </Route>
                    <Route path="employee" element={<Outlet />}>
                        <Route index element={<Employee />}/>
                        <Route path="dashboard" element={<Dashboard />}/>
                    </Route>
                    <Route path="*" element={<NoMatch />} />
                </Route>
            </Routes>
        </BrowserRouter>
      </ProvideTurn>
      </ProvideAuth>
  );
}

export default App;
