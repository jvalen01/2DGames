// Observer pattern implementation using node
class Node {
    // Create new node
    constructor() {
        this.nodes = []
    }

    // Add a new node
    // @node - node to add to observer list
    add(node) {
        if(!node) return false
        return this.nodes.push(node)
    }

    // Remove a node
    // @node - node to remove from observer list
    remove(node) {
        var index = this.nodes.indexOf(node)
        if (index >= 0) this.nodes.splice(index, 1)
    }

    // Notify observers
    // @event - name of the function to call on the observers
    // @... - additional arguments to pass to the event call
    notify( /*event , args ... */ ) {
        var event = arguments[0]
        var args = Array.prototype.slice.call(arguments, 1)

        // Call all observers that can receive the call
        for (var index in this.nodes) {
            var node = this.nodes[index]
            if (node && typeof(node[event]) == "function")
                node[event].apply(node, args)
        }
    }
}