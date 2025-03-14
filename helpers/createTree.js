const createTree = (arr, parentId = "") => {
    const tree = [];
    arr.forEach((item) => {
        if (item.parent_id === parentId) { // if item is parent
            const newItem = item; // clone item
            const children = createTree(arr, item.id); // get children
            if (children.length > 0) { // if item has children
                newItem.children = children; // add children to item object
            }
            tree.push(newItem); // add item to tree
        }
    });
    return tree;
}

module.exports.tree = (arr, parentId = "") => {
    const tree = createTree(arr, parentId = "");
    return tree;
}