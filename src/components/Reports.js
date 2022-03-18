import React, { useState, useEffect, useRef } from 'react'
import Chart from 'chart.js/auto';
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import { Heading, SimpleGrid, HStack, VStack, Flex, Square, Text, FormControl,
    FormLabel, Select, Grid,
    GridItem } from '@chakra-ui/react'
    
import { useAuth } from '../hooks/useAuth'
import siteService from '../services/sites'
import reportService from '../services/reports.js'

function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();
    // Store current value in ref
    useEffect(() => {
      ref.current = value;
    }, [value]); // Only re-run if value changes
    // Return previous value (happens before update in useEffect above)
    return ref.current;
  }

const Reports = () => {

    const [state, setState] = useState({ sede: '', caja: '', tipo:''})
    const [sedes, setSedes] = useState([])
    const [value, setValue] = useState('')
    const [cajas, setCajas] = useState([])
    const [cajas2, setCajas2] = useState([])
    const [vips, setVips] = useState([])
    const [reportes, setReportes] = useState([])
    const [update, setUpdate] = useState(0)
    const previousUpdate = usePrevious(update)
    const [chartData, setChartData] = useState({datasets: [],});
    const [chartOptions, setChartOptions] = useState({});
    
    const auth = useAuth()

    useEffect(() => {   //Javascript es magia negra pana, Brujería.
        const fetchCajas = async () => {
            const result = await siteService.getAllSites() 
            
            
            
            setSedes(result)
          
        }
    
        // Solo llamar a la función si se le ha dado click
        // al botón de actualizar.
        if (previousUpdate !== update) {
          fetchCajas()
        }
        setChartData({
            labels: Object.keys(Object.assign({}, ...cajas)),
            datasets: [
              {
                label: "Cajas de la sede",
                data: [cajas2],
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.4)",
              },
            ],
          });
          setChartOptions({
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Por Sede",
              },
            },
          });

      }, [update, previousUpdate])
      
     //1000000000000000000000000 IQ
      console.log(Object.keys(cajas2))
      
      const fetchReport = async (sede_id) => {
        const result = await reportService.getTurnosSedeReport(sede_id)
        const reporte1 = await reportService.getVipReport()
        const reporte2 = await reportService.getTurnosReport()
        setVips(reporte1)
        setCajas(result)
        setCajas2(result[0].G, result[1].IE, result[2].G, result[3].G, result[4].D, result[5].S, result[6].VIP)
    }
        
      const handleChange = (event) => {
        const obj = {}
        let key
        if (typeof event === "string") {
            console.log(event)
            obj['caja'] = event[0]
            obj['tipo'] = event.split(',')[1]  
        } else {
            key = event.target.id ? event.target.id : event.target.name 
            obj[key] = event.target.value
            fetchReport(obj[key])
            console.log(obj)
            setValue(event.target.value)
        }
        console.log(obj)
        const prevState = JSON.parse(JSON.stringify(state))
        setState({ ...prevState, ...obj })
    }
    const chartOptions1 ={
        legend: {
            display: false,
            position: "right"
        }
    }
    const chartOptions2 ={
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Cantidad VIP",
          },
        },
      }
      const chartData2 ={
        labels: Object.keys(vips),
        datasets: [
          {
            label: "Cantidad de turnos VIP",
            data: Object.values(vips),
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.4)",
          },
        ],
      }

    return (
        <div>
            <Grid
            h='100%'
            w='100%'
            mt='-3em'
            templateColumns='repeat(12,1fr)'
            templateRows='repeat(3,1fr)'
            gap={4}>
            <GridItem rowSpan={3} colSpan={6} mt='1em'>    
           
                <FormLabel html-for="sede" fontSize='calc(0.75em + 1vmin)' >Sedes</FormLabel>
                <Select id="sede" placeholder="Seleccionar sede"  value={value} onChange={handleChange}>
                    {Object.values(sedes).map((obj) => {
                        return <option key={obj.id} value={obj.id}>{obj.nombre}</option> //Si no ponemos value el asume nombre, pero no queremos buscar por nombre
                    })}
                </Select> 
                     
        </GridItem>
        <GridItem rowSpan={3} colSpan={6} mt='1e'>
        <Bar options={chartOptions} data={chartData} />   
        <Bar options={chartOptions2} data={chartData2}/>
        </GridItem>           
        </Grid>
        </div>    
    )
}

export default Reports


