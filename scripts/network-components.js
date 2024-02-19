var cableID = 0

class NetworkComponent {
    type = null
    image = null
    domObj = null
    networkAdapters = []
    constructor() {
        this.macadr = "XX:XX:XX:XX:XX:XX".replace(/X/g, function() {
            return "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16))
          })
    }

    getMACAdr() {
        return this.macadr
    }

    /**
     * Assign a DOM object to this component object.
     * 
     * @param {Node} o DOM object that is being assigned to this component
     */
    assignDOMObject(o) {
        this.domObj = o
    }
    
    getDOMObject(o) {
        return this.domObj
    }
}

class Cable extends NetworkComponent {
    constructor() {
        super()
        super.type = "cable"
        super.image = "resources/cable.png"
        super.macadr = "cable-" + cableID++
    }
}

class Device extends NetworkComponent {
    constructor() {
        super()
        super.type = "device"
        this.networkAdapters.push(new NetworkAdapter())
    }

    /**
     * Check if this device is already connected.
     * 
     * @returns true if this device is already connected
     */
    isConnected() {
        return this.networkAdapters[0].connected == true
    }

    /**
     * Connect the device with a device with the given MAC address.
     * 
     * @param {*} mac 
     */
    connect(mac) {
        this.networkAdapters[0].connect(mac)
    }
}

class Laptop extends Device {
    constructor() {
        super()
        super.image = "resources/laptop.png"
    }
}

class Phone extends Device {
    constructor() {
        super()
        super.image = "resouces/phone.png"
    }
}

class Switch extends NetworkComponent {
    constructor(numberOfConnections) {
        super()
        super.type = "switch"
        for (var i = 0; i < numberOfConnections; i++) {
            this.networkAdapters.push(new NetworkAdapter())
        }
    }
}

class Router extends NetworkComponent {
    constructor() {
        super()
        super.type = "router"
    }
}

class NetworkAdapter {
    connectedMAC = null
    constructor() {
        this.connected = false
    }

    /**
     * Connect this device to the device with the given MAC address
     * @param {*} mac 
     */
    connect(mac) {
        this.connectedMAC = mac
        this.connected = true
    }
}