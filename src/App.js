//import { createBrowserHistory } from "history";
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
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Inicio />} />
                    <Route path="client" element={<Client />}/>
                    <Route path="employee" element={<Employee />}/>
                </Route>
            </Routes>
        </BrowserRouter>
  );
}

export default App;
