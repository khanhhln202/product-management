module.exports = (objPagination, query, countProducts) => {
    if (query.page) {
        objPagination.currentPage = parseInt(query.page);
    }
    
    objPagination.skip = (objPagination.currentPage - 1) * objPagination.limitItems;
    
    objPagination.totalItems = countProducts;
    objPagination.totalPages = Math.ceil(countProducts / objPagination.limitItems);

    return objPagination;
}