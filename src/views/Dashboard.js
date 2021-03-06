import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import CajaLayout from '../components/CajaLayout.js'
import EmployeeClockInForm from '../components/forms/EmployeeClockIn.js'
import ClientForm from '../components/forms/Client.js'
import Reports from '../components/Reports.js'

const Dashboard = () => {
    return (
        <Tabs size='md' align='center' isFitted mt='1em' w='85%' bg='white' variant='enclosed-colored'>
            <TabList mb='2em'>
                <Tab>Ingreso</Tab>
                <Tab>Cajas</Tab>
                <Tab>Reportes</Tab>
             </TabList>
             <TabPanels>
                <TabPanel>
                  <EmployeeClockInForm></EmployeeClockInForm>
               </TabPanel>  
               <TabPanel>
                    <CajaLayout></CajaLayout>
                </TabPanel>
               <TabPanel>
                    <Reports></Reports>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default Dashboard
