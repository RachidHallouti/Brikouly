import { useEffect, useState } from "react"
import getNearestCities from "./nearestCities"

export default function useNearestCities(){
    const [location,setLocation] = useState([])

    useEffect(()=>{
        getNearestCities().then(e=>{
            setLocation(e)
        })
    },[location])
    return location
}