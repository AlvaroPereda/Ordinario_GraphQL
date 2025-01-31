export const typeDefs = `#graphql

    type Restaurante {
        id: ID!,
        nombre: String!,
        direccion_total: String!
        telefono: String!,
        temperatura: Int!,
        hora: String!
    }

    type Query {
        getRestaurant(id: ID!):Restaurante!
        getRestaurants(ciudad: String!):[Restaurante!]!
    }

    type Mutation {
        addRestaurant(nombre: String!, direccion: String!, ciudad: String!, telefono: String!):Restaurante!
        deleteRestaurant(id: ID!):Boolean
    }

`