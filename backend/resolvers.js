const items = require('./data-base');

module.exports = resolvers = {
    Query: {
        items(_, args) {
            console.log(args)
            return items.filter(item => item.type === args.type);
        }
    },
    Mutation: {
        saveItem(_, args) {
            const id = Math.ceil(Math.random() * 1000);
            const item = {
                id,
                type: args.item.type,
                description: args.item.description
            }
            items.push(item);
            return item;
        },
        removeItem(_, args) {
            const item = items.find(item => item.id === args.id);
            if (item) {
                items.splice(items.indexOf(item), 1);
                return true;
            }
            return false;
        }
    }
};