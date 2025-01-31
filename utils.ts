import { GraphQLError } from "graphql";
import { API_datetime, API_lat_lon, API_Phone, API_temp } from "./type.ts";

const API_KEY = Deno.env.get("API_KEY")

export const validatePhone = async(telefono: string) => {
    if(!API_KEY) throw new Error("Error con la API_KEY")
    const url = `https://api.api-ninjas.com/v1/validatephone?number=${telefono}`
    const data = await fetch(url, {
        headers: {
            'X-Api-Key': API_KEY
          }
    })
    if(data.status !== 200) throw new GraphQLError("Fallo al solicitar a la API")
    const result:API_Phone = await data.json()
    return {
        is_valid: result.is_valid,
        pais: result.country
    }
}

export const getLatLon = async(ciudad: string) => {
    if(!API_KEY) throw new Error("Error con la API_KEY")
    const url = `https://api.api-ninjas.com/v1/city?name=${ciudad}`
    const data = await fetch(url, {
        headers: {
            'X-Api-Key': API_KEY
          }
    })
    if(data.status !== 200) throw new GraphQLError("Fallo al solicitar a la API")
    const result = await data.json()
    const aux:API_lat_lon = result[0]
    return {
        latitud: aux.latitude,
        longitud: aux.longitude
    }
}

export const getDatetime = async(lat: number, lon: number) => {
    if(!API_KEY) throw new Error("Error con la API_KEY")
        const url = `https://api.api-ninjas.com/v1/worldtime?lat=${lat}&&lon=${lon}`
        const data = await fetch(url, {
            headers: {
                'X-Api-Key': API_KEY
              }
        })
        if(data.status !== 200) throw new GraphQLError("Fallo al solicitar a la API")
        const result:API_datetime = await data.json()
        return {
            hora: result.hour,
            minuto: result.minute
        }
}

export const getTemperature = async(lat: number, lon: number) => {
    if(!API_KEY) throw new Error("Error con la API_KEY")
        const url = `https://api.api-ninjas.com/v1/weather?lat=${lat}&&lon=${lon}`
        const data = await fetch(url, {
            headers: {
                'X-Api-Key': API_KEY
              }
        })
        if(data.status !== 200) throw new GraphQLError("Fallo al solicitar a la API")
        const result:API_temp = await data.json()
        return result.temp
}