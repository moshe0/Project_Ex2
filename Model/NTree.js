function NTree(data, node, arr, count) {
        this.data = data;
        this.parent = node;
        this.children = arr;
        this.count = count;
}

module.exports = NTree;