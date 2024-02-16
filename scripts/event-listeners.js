document.addEventListener('DOMContentLoaded', () => {
    
    document.getElementById("canvas").addEventListener('click', () => {
        if (networkComponentPicked) {
            placeNetworkComponent()
        }
    })

    Array.from(document.getElementsByClassName("btn-tool")).forEach((btn) => {
        btn.addEventListener('click', (e) => {
            if (mode == "edit") {
                e.stopPropagation()
                pickNetworkComponent(e.target.dataset.type, e.clientX, e.clientY)
            }
        })
    })

})