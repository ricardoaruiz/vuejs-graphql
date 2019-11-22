const data = require('./data-base');

module.exports = resolvers = {
    Query: {
        items(_, args) {
            return data.items.filter(item => item.type === args.type);
        },
        domains(_) {
            return data.domains;
        }
    },
    Mutation: {
        saveItem(_, args) {
            const id = getNewId();
            const item = {
                id,
                type: args.item.type,
                description: args.item.description
            }
            data.items.push(item);
            addDomains(item.type, item.description);
            return item;
        },
        removeItem(_, args) {
            const item = data.items.find(item => item.id === args.id);
            if (item) {
                data.items.splice(data.items.indexOf(item), 1);
                removeDomainsFromItens(item.type, item.description);
                return true;
            }
            return false;
        }
    }
};

const getNewId = () => {
    return Math.ceil(Math.random() * 1000);
}

const addDomains = (type, value) => {
    const newDomains = data.items.filter(item => item.type === (type === 'prefix' ? 'sufix' : 'prefix'))
        .map(filteredItem => ({
            id: getNewId(),
            description: (type === 'prefix' ? `${value}${filteredItem.description}` : `${filteredItem.description}${value}`) ,
            availabel: true
        }));
    data.domains = data.domains.concat(newDomains);
}

const removeDomainsFromItens = (type, value) => {
    const removedDomains = data.domains
        .filter(item => type === 'prefix' 
                            ? item.description.indexOf(value) === 0 
                            : item.description.indexOf(value) > 0);

    removedDomains.forEach(deletedDomain => 
        data.domains.splice(data.domains.indexOf(deletedDomain), 1));
}