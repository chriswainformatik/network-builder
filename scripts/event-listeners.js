document.addEventListener('DOMContentLoaded', () => {
    
    document.getElementById("canvas").addEventListener('click', () => {
        if (networkComponentPicked) {
            placeNetworkComponent()
        } else {
            deselectComponent()
        }
    })

    Array.from(document.getElementsByClassName("btn-tool")).forEach((btn) => {
        btn.addEventListener('click', (e) => {
            if (mode == "edit") {
                e.stopPropagation()
                cancelComponentPlacement()
                pickNetworkComponent(e.target.dataset.type, (e.clientX - canvas.offsetLeft), (e.clientY - canvas.offsetTop))
            }
        })
    })

    document.addEventListener('contextmenu', (e) => {
        if (networkComponentPicked || cablePlacement) {
            e.preventDefault()
            cancelComponentPlacement()
        }
    })

    document.addEventListener('keyup', (e) => {
        if (e.key == "Bacspace") {
            if (networkComponentPicked || cablePlacement) {
                cancelComponentPlacement()
            } else {
                deleteComponent()
            }
        }
        
    })

    document.getElementById('btn-sidebar-settings-close').addEventListener('click', () => hideSidebar())

})