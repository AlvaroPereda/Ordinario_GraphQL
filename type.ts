import { OptionalId } from "mongodb";

export type RestauranteModel = OptionalId<{
    nombre: string,
    direccion: string,
    ciudad: string,
    telefono: string, 
    pais: string,
    latitud: number,
    longitud: number
}>

// https://api-ninjas.com/api/validatephone
export type API_Phone = {
    is_valid: boolean,
    country: string
}
// https://api-ninjas.com/api/city
export type API_lat_lon = {
    latitude: number,
    longitude: number 
}
// https://api-ninjas.com/api/worldtime
export type API_datetime = {
    hour: number,
    minute: number
}
// https://api-ninjas.com/api/weather
export type API_temp = {
    temp: number
}