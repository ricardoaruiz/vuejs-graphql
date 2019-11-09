module.exports = typeDefs = 
`
    type Item {
        id: Int
        type: String
        description: String
    }

    input ItemInput {
        type: String
        description: String
    }

    type Query {
        items (type: String): [Item!]
    }

    type Mutation {
        saveItem(item: ItemInput): Item!
        removeItem(id: Int): Boolean
    }
`;