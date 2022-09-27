import { BrowserRouter as Router, Routes,  Route } from "react-router-dom"
import Datatable from './Datatable/Datatable'
import Details from './Details/Details'
import './app.css'

export default function App() {
    return (
        <>
        <Router>
            <Routes>
                <Route path = "/" element = {<Datatable></Datatable>} />
                <Route path = "/Details/:id" element = {<Details />} exact />
                
            </Routes>
        </Router>
        </>
    )
}