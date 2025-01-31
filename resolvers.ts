import { Collection, ObjectId } from "mongodb";
import { RestauranteModel } from "./type.ts";
import { GraphQLError } from "graphql";
import { getDatetime, getLatLon, getTemperature, validatePhone } from "./utils.ts";

type Context = {
    ResturanteCollection: Collection<RestauranteModel>
}

type MutationArgs = {
    id: string,
    nombre: string,
    direccion: string,
    ciudad: string,
    telefono: string,
    pais: string,
    latitud: number,
    longitud: number
}


export const resolvers = {

    Restaurante: {
        id: (parent:RestauranteModel) => parent._id!.toString(),
        direccion_total: (parent:RestauranteModel) => `${parent.direccion}, ${parent.ciudad}, ${parent.pais}`,
        temperatura: async(parent:RestauranteModel) => await getTemperature(parent.latitud,parent.longitud),
        hora: async(parent:RestauranteModel) => {
            const { hora, minuto } = await getDatetime(parent.latitud, parent.longitud)
            return `${hora}:${minuto}`
        } 
    },

    Query: {
        getRestaurant: async(
            _:unknown,
            args: MutationArgs,
            context: Context
        ):Promise<RestauranteModel> => {
            const result = await context.ResturanteCollection.findOne({_id: new ObjectId(args.id)})
            if(!result) throw new GraphQLError("El restaurante no existe")
            return result
        },
        getRestaurants: async(
            _:unknown,
            args: MutationArgs,
            context: Context
        ):Promise<RestauranteModel[]> => {
            const result = await context.ResturanteCollection.find({ciudad: args.ciudad}).toArray()
            if(result.length === 0) throw new GraphQLError("No existen restaurantes en esa zona")
            return result
        }
    },
    Mutation: {
        addRestaurant: async(
            _:unknown,
            args: MutationArgs,
            context: Context
        ):Promise<RestauranteModel> => {
            const movilRestaurante = await context.ResturanteCollection.findOne({telefono: args.telefono})
            if(movilRestaurante) throw new GraphQLError("Ya existe es telefono registrado")
            
            const { pais, is_valid } = await validatePhone(args.telefono)
            if(!is_valid) throw new GraphQLError("El telefono no es valido")
            const { latitud, longitud } = await getLatLon(args.ciudad)
            args = {...args, pais, latitud, longitud}
            const { insertedId } = await context.ResturanteCollection.insertOne({...args})
            return {
                _id: insertedId,
                ...args
            }
        },
        deleteRestaurant: async(
            _:unknown,
            args: MutationArgs,
            context: Context
        ):Promise<boolean> => {
            const { deletedCount } = await context.ResturanteCollection.deleteOne({_id: new ObjectId(args.id)})
            if(deletedCount === 0) return false
            return true
        }
    }
}