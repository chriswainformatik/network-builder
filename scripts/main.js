// define constants
const tools = ['cable', 'laptop']
var mode = "edit"

var cables = []

var networkComponentPicked = false
var spriteDiv = null
var newCable = null

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
    spriteDiv = document.createElement("div")
    spriteDiv.classList.add("network-component-sprite")
    spriteDiv.classList.add("picked-network-component")
    spriteDiv.style.position = "absolute"
    spriteDiv.style.left = x + "px"
    spriteDiv.style.top = y + "px"
    spriteDiv.style.height = "100px"
    spriteDiv.style.width = "100px"
    spriteDiv.style.pointerEvents = "none"
    document.addEventListener('mousemove', followMouse)
    document.addEventListener('mousemove', AnimEvent.add(function() {
        try {
            newCable.position()
        } catch (error) {
            // newCable doesn't exist
        }
    }), false)
    var img = document.createElement("img")
    img.src = "resources/" + type + ".png"
    img.height = 100
    img.width = 100
    img.style.pointerEvents = "none"
    spriteDiv.append(img)
    if (type == "cable") {
        var description = document.createElement("div")
        description.classList.add("cable-description")
        description.style.position = "absolute"
        description.style.left = 0
        description.innerHTML = "1. Gerät wählen"
        spriteDiv.append(description)
        Array.from(document.getElementsByClassName("network-component-sprite")).forEach((component) => {
            component.style.pointerEvents = "all"
            component.addEventListener('click', attachCable)
        })
    }

    document.getElementById("canvas").appendChild(spriteDiv)

    networkComponentPicked = true
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

/**
 * Event handler for cable attachement.
 * @param {*} event 
 */
function attachCable(event) {
    event.stopPropagation()
    var cableDiv = document.getElementsByClassName("cable-description")[0]
    cableDiv.innerHTML = "2. Gerät wählen"
    newCable = new LeaderLine(
        LeaderLine.pointAnchor({
            element: event.target,
            x: 50,
            y: 50,
        }),
        LeaderLine.pointAnchor({
            element: cableDiv,
            x: 10,
            y: -100,
        }),
        {
            color: 'black',
            size: 1,
            startPlug: 'behind',
            endPlug: 'behind'
        }
    )
}

/**
 * Places a formerly picked network component at the location of the pointer
 * or discards the pick-and-place-action if the pointer is outside the canvas.
 */
function placeNetworkComponent() {
    document.removeEventListener('mousemove', followMouse)
    networkComponentPicked = false
}

/**
 * Stops the placement of a network component.
 */
function discardComponentPlacement() {
    document.getElementsByClassName('picked-network-component')[0].remove()
    networkComponentPicked = false
}