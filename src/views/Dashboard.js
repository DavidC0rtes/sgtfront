import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import CajaLayout from '../components/CajaLayout.js'
import EmployeeClockInForm from '../components/forms/EmployeeClockIn.js'

const Dashboard = () => {
    return (
        <Tabs size='md' align='center' isFitted mt='1em' w='85%' bg='white' variant='enclosed-colored'>
            <TabList mb='2em'>
                <Tab>Ingreso</Tab>
                <Tab>Turno actual</Tab>
                <Tab>Cajas</Tab>
                <Tab>Reportes</Tab>
             </TabList>
             <TabPanels>
                <TabPanel>
                   <EmployeeClockInForm></EmployeeClockInForm>
               </TabPanel>  
               <TabPanel>
                    <p>one!</p>
               </TabPanel>
               <TabPanel>
                    <CajaLayout></CajaLayout>
                </TabPanel>
               <TabPanel>
                    <p>three!</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default Dashboard
