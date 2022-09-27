import React from "react"
import Axios from "axios"
import {useState, useEffect} from "react"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import {useNavigate} from "react-router-dom"
import "./Datatable.css"


export default function Datatable() {

    const [data, setData] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        getData()
    }, [])
    
    const headers = ["ID", "Manufacturer", "Country", "Actions"]

    const getData = () => {
        Axios.get("https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json")
        .then((res) => {
            console.log(res.data.Results);
            
             setData(res.data.Results.slice(0,10))
        })
        .catch((error) => {
            console.log(error)
        })

    }

     function MoreDetails(id) {
           navigate(`/Details/${id}`, {replace:true})
    }

    return (
        <>
        <Table responsive striped bordered hover size="sm" variant = "info" className = "tablica">
        <thead>
            <tr className = "table-header">
            {headers.map(header => <th>{header}</th>)}
            </tr>
        </thead>
        <tbody>
            {data.map(vehicle => 
            <tr key = {vehicle.Mfr_ID} className="table-row">
                <td>
                    {vehicle.Mfr_ID}
                </td>
                <td className = "table-manufacturer">
                    {vehicle.Mfr_CommonName == null ? vehicle.Mfr_Name : vehicle.Mfr_CommonName }
                </td>
                <td className = "table-country">
                    {vehicle.Country}
                </td>
                <td className = "table-actions">
                    <Button variant = "light" size="md" onClick = {() => MoreDetails(vehicle.Mfr_ID)}>See more</Button>
                </td>
            </tr>)}
            
        </tbody>
        </Table>
   
        </>
        
        

         
            
        
    )
}