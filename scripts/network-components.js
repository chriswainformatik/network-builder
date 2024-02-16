class NetworkComponent {
    type = null
    image = null
}

class Cable extends NetworkComponent {
    constructor() {
        super.type = "cable"
        super.image = "resources/cable.png"
    }
}

class Device extends NetworkComponent {
    constructor() {
        super.type = "device"
    }
}

class Laptop extends Device {
    constructor() {
        super.image = "resources/laptop.png"
    }
}

class Phone extends Device {
    constructor() {
        super.image = "resouces/phone.png"
    }
}

class Switch extends NetworkComponent {
    constructor() {
        super.type = "switch"
    }
}

class Router extends NetworkComponent {
    constructor() {
        super.type = "router"
    }
}