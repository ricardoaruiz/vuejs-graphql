module.exports = typeDefs = 
`
    type Item {
        id: Int
        type: String
        description: String
    }

    type Domain {
        id: Int
        description: String
        available: Boolean
    }

    input ItemInput {
        type: String
        description: String
    }

    type Query {
        items(type: String): [Item!]
        domains: [Domain!]
    }

    type Mutation {
        saveItem(item: ItemInput): Item!
        removeItem(id: Int): Boolean
    }
`;