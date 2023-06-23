export const dataFetchingPaginate = (state, dataLength) => {
  const { addMorePage, currentPage, totalSize, sizePerPage } = state
  let nextState = state
  if (addMorePage && totalSize / sizePerPage === currentPage && dataLength === sizePerPage) {
    nextState.totalSize = totalSize * 2
  }
  if (dataLength < sizePerPage) {
    nextState.totalSize = sizePerPage * currentPage
    // if there is no datalist, not add more page anymore and reduce one page
    if (dataLength === 0 && currentPage != 1) {
      nextState.addMorePage = false
      nextState.totalSize = nextState.totalSize - nextState.sizePerPage
      nextState.currentPage = nextState.currentPage - 1
    }
    if (dataLength === 0 && currentPage === 1) {
      nextState.addMorePage = true
    }
  }
  return nextState
}
