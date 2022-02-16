//import { createBrowserHistory } from "history";
import { ProvideAuth } from './hooks/useAuth'
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

//const hist = createBrowserHistory()

function App() {
  return (
      <ProvideAuth>
        <BrowserRouter>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<Inicio />} />
                    <Route path="client" element={<Client />}/>
                    <Route path="employee" element={<Outlet />}>
                        <Route index element={<Employee />}/>
                        <Route path="dashboard" element={<Dashboard />}/>
                    </Route>
                    <Route path="*" element={<NoMatch />} />
                </Route>
            </Routes>
        </BrowserRouter>
      </ProvideAuth>
  );
}

export default App;
