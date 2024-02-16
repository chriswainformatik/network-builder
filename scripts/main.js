// define constants
const tools = ['cable', 'laptop']
const spriteSize = 100
var mode = "edit"

// save all the cable instances
var cables = []
// if cable is being placed
var cablePlacement = false
// if a cable has a lose end at the moment
var loseCable = false
// start element of the lose cable
var loseCableStart = null

// if a network component is being picked and ready to be placed
var networkComponentPicked = false
// placeholder for component sprite being moved around
var spriteDiv = null
// placeholder for cable being moved around
var newCable = null

// placeholder for data object of component that is to be created
var newComponent = null
// save all the component instances
var components = []

// save draggables for cable update, because cables are created after the components
var draggables = []

const canvas = document.getElementById("canvas")

// load ui components
loadToolbar()


/**
 * Loads the toolbar.
 */
function loadToolbar() {
    var toolsList = document.getElementById("tools-list")
    for (var t in tools) {
        var div = document.createElement("div")
        div.classList.add("d-flex")
        div.classList.add("justify-content-center")
        div.classList.add("my-2")
        var btn = document.createElement("button")
        btn.type = "button"
        btn.classList.add("btn")
        btn.classList.add("btn-light")
        btn.classList.add("btn-tool")
        //btn.innerHTML = tools[t]
        btn.innerHTML = "<img src='resources/" + tools[t] + ".png' width='50' height='50' class='sprite-div-img' />"
        btn.id = "btn-" + tools[t]
        btn.dataset.type = tools[t]
        div.append(btn)
        toolsList.append(div)
    }
}

/**
 * Picks a network component and shows it next to the pointer.
 * 
 * @param {*} type type of the component you clicked on
 * @param {*} x initial x-coordinate of the pointer
 * @param {*} y initial y-coordinate of the pointer
 */
function pickNetworkComponent(type, x, y) {
    var component = (() => {
        if (type == "laptop") {
            return new Laptop()
        } else if (type == "cable") {
            return new Cable()
        }
        return new NetworkComponent()
    })()
    newComponent = component
    spriteDiv = document.createElement("div")
    spriteDiv.id = component.getMACAdr()
    spriteDiv.classList.add("network-component-sprite")
    spriteDiv.classList.add("picked-network-component")
    spriteDiv.style.position = "absolute"
    spriteDiv.style.left = x + "px"
    spriteDiv.style.top = y + "px"
    spriteDiv.style.height = 0
    spriteDiv.style.width = 0
    //spriteDiv.style.pointerEvents = "none"
    document.addEventListener('mousemove', followMouse)
    
    
    if (type == "cable") {
        // place cable
        cablePlacement = true
        var description = document.createElement("div")
        description.classList.add("cable-description")
        description.style.position = "absolute"
        description.style.left = 0
        description.style.top = 20 + "px"
        description.innerHTML = "1. Gerät wählen"
        spriteDiv.append(description)
        document.addEventListener('mousemove', AnimEvent.add(function() {
            try {
                newCable.position()
            } catch (error) {
                // newCable doesn't exist
            }
        }), false)
    } else {
        // place other component
        networkComponentPicked = true

        spriteDiv.style.height = spriteSize + "px"
        spriteDiv.style.width = spriteSize + "px"

        var img = document.createElement("img")
        img.src = "resources/" + type + ".png"
        img.height = spriteSize
        img.width = spriteSize
        img.style.pointerEvents = "none"
        spriteDiv.append(img)

        newComponent.assignDOMObject(spriteDiv)

        spriteDiv.addEventListener('click', attachCable)
    }

    document.getElementById("canvas").appendChild(spriteDiv)
}

/**
 * Event handler for a picked network component to follow the mouse.
 * 
 * @param {*} event 
 */
function followMouse(event) {
    spriteDiv.style.left = (event.clientX - canvas.offsetLeft) + "px"
    spriteDiv.style.top = (event.clientY - canvas.offsetTop) + "px"
}

function attachCable(event) {
    if (cablePlacement) {
        event.stopPropagation()
        if (loseCable) {
            // attach end
            document.removeEventListener('mousemove', followMouse)
            newCable.remove()
            newCable = null
            var cableEnd = document.getElementById(spriteDiv.id)
            var c = new LeaderLine(
                LeaderLine.pointAnchor({
                    element: loseCableStart,
                    x: spriteSize/2,
                    y: spriteSize/2,
                }),
                LeaderLine.pointAnchor({
                    element: cableEnd,
                    x: 0,
                    y: 0,
                }),
                {
                    color: 'black',
                    size: 1,
                    startPlug: 'behind',
                    endPlug: 'behind'
                }
            )

            // assign onMove event to cable start and end
            for (var d in draggables) {
                if (d.id == loseCableStart.id) {
                    d.draggableObj.onMove = function(newPos) {
                        c.position()
                    }
                }
                if (d.id == cableEnd.id) {
                    d.draggableObj.onMove = function(newPos) {
                        c.position()
                    }
                }
            }

            document.getElementsByClassName("cable-description")[0].remove()
            loseCableStart = null
            newComponent.assignDOMObject(c)
            cables.push(newComponent)
            cablePlacement = false
            
        } else {
            // attach start
            var cableDiv = document.getElementsByClassName("cable-description")[0]
            cableDiv.innerHTML = "2. Gerät wählen"
            newCable = new LeaderLine(
                LeaderLine.pointAnchor({
                    element: event.target,
                    x: spriteSize/2,
                    y: spriteSize/2,
                }),
                LeaderLine.pointAnchor({
                    element: cableDiv,
                    x: 0,
                    y: 0,
                }),
                {
                    color: 'black',
                    size: 1,
                    startPlug: 'behind',
                    endPlug: 'behind'
                }
            )
            loseCableStart = event.target
        }
        loseCable = !loseCable
    }
}

/**
 * Places a formerly picked network component at the location of the pointer
 * or discards the pick-and-place-action if the pointer is outside the canvas.
 */
function placeNetworkComponent() {
    var newID = newComponent.getDOMObject().id
    draggables.push({
        id : newID,
        draggableObj : new PlainDraggable(newComponent.getDOMObject())
    })
    document.removeEventListener('mousemove', followMouse)
    networkComponentPicked = false
    components.push(newComponent)
    newComponent = null
}

/**
 * Stops the placement of a network component.
 */
function discardComponentPlacement() {
    document.getElementsByClassName('picked-network-component')[0].remove()
    networkComponentPicked = false
}