import http from "./HttpConfig";

export default class DomainService {

    static listItems(type) {
        return http.post('',{
            query: `
                query ($type: String) {
                    items: items (type: $type) {
                        id,
                        type,
                        description
                    }
                }
            `,
            variables: {
                type
            }            
        })
        .then(response => response.data);
    }

    static listDomains() {
        return http.post('', {
            query: `
                query {
                    domains: domains {
                        id 
                        description 
                        available
                    }
                }
            `
        })
        .then(response => response.data);
    }

    static addItem(item) {
        return http.post('', {
            query: `
                mutation ($item: ItemInput) {
                    newItem: saveItem (item: $item) {
                        id type description
                    }
                }
            `,
            variables: {
                item
            }
        })
        .then(response => response.data);
    }

    static removeItem(item) {
        return http.post('', {
            query: `
                mutation ($id: Int) {
                    deleted: removeItem (id: $id)
                }
            `,
            variables: {
                id: item.id
            }
        })
        .then(response => response.data);
    }


}