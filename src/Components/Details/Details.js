import Axios from 'axios'
import { useEffect, useState } from 'react'
import Button from "react-bootstrap/Button"
import Card from 'react-bootstrap/Card'
import {useNavigate} from "react-router-dom"
import './Details.css'
export default function Details() {
    const id = window.location.pathname.split('/Details/')
    const [data, setData] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        getData()
    }, [])
    
    const goHome = () => {
        navigate("/", {replace:true})
    }
    const getData = () => {
        Axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetManufacturerDetails/${id[1]}?format=json`)
        .then((res) => {
            console.log(res.data.Results)
            setData(res.data.Results);
        })
        .catch((error) => {
            console.log(error)
        })

    }
    return (
        <>
       
            {data.map(vehicle =>
            <Card className="card bg-info">
            
            <Card.Body>
            
                <Card.Title>{vehicle.Mfr_Name}</Card.Title>
                
                    <Card.Text className="card-text">
                    CEO: {vehicle.PrincipalFirstName != null ? vehicle.PrincipalFirstName : 'Not defined'} <br /> Address: {vehicle.Address} <br /> Postal code: {vehicle.PostalCode} <br />
                    Location: {vehicle.City}, {vehicle.StateProvince}, {vehicle.Country} <br />
                    Vehicle types: {vehicle.VehicleTypes != null ? vehicle.VehicleTypes.map((vehicle) => <strong>{vehicle.Name}<br /></strong>) : 'Not defined'}
                    
                    </Card.Text>
                
                
                
            </Card.Body>
            
            <Card.Footer>
            <Button variant="dark" onClick = {() => goHome()}>Take me back!</Button>
            </Card.Footer>
            </Card>
            
            )};
            

   
        </>
    )
}