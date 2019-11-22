module.exports = {
    items: [
        { id: 1, type: 'prefix', description: 'Air'},
        { id: 2, type: 'prefix', description: 'Jet'},
        { id: 3, type: 'prefix', description: 'Flight'},
        { id: 4, type: 'sufix', description: 'Hub'},
        { id: 5, type: 'sufix', description: 'Station'},
        { id: 6, type: 'sufix', description: 'Mart'}
    ],
    domains: [
        { id: 1, description: 'AirHub', available: true},
        { id: 2, description: 'AirStation', available: true},
        { id: 3, description: 'AirMart', available: false},
        { id: 4, description: 'JetHub', available: true},
        { id: 5, description: 'JetStation', available: true},
        { id: 6, description: 'JetMart', available: false},
        { id: 7, description: 'FlightHub', available: true},
        { id: 8, description: 'FlightStation', available: true},
        { id: 9, description: 'FlightMart', available: true}
    ]    
};