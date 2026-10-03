export const filterByQueryParams = (data, queryParams) => {
  const { name, category, price } = queryParams;

  if(name) return data.filter((item) => item.name.toLowerCase() === name.toLowerCase())
   
    if (category) {
      data = data.filter((item) => item.category.toLowerCase() === category.toLowerCase());
    }
    if (price) {
      data = data.filter((item) => item.price === Number(price));
    }
  return data;
};