import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import CajaLayout from '../components/CajaLayout.js'

const Dashboard = () => {
    return (
        <Tabs size='md' align='center' isFitted mt='1em' w='85%' bg='white' variant='enclosed-colored'>
            <TabList mb='2em'>
                <Tab>Turno actual</Tab>
                <Tab>Cajas</Tab>
                <Tab>Reportes</Tab>
             </TabList>
             <TabPanels>
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
