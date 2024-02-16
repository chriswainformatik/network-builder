class NetworkComponent {
    type = null
    image = null
    domObj = null
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
        super.macadr = null
    }
}

class Device extends NetworkComponent {
    constructor() {
        super()
        super.type = "device"
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
    constructor() {
        super()
        super.type = "switch"
    }
}

class Router extends NetworkComponent {
    constructor() {
        super()
        super.type = "router"
    }
}