export const resetFilterLocalStorage = () => {
    localStorage.removeItem('location');
    localStorage.removeItem('onlyNewest');
    localStorage.removeItem('sortByPrice');
    localStorage.removeItem('selectedRetailers');
    localStorage.removeItem('selectedCategories');
    localStorage.removeItem('priceRange');
    localStorage.removeItem('currentPage');
  };
  