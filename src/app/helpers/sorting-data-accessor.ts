
// this is needed to allow sorting on nested properties
const nestedProperty = (data: any, sortHeaderId: string): string | number => {
  return sortHeaderId
    .split('.')
    .reduce((accumulator, key) => accumulator && accumulator[key], data) as string | number;
};

// ... other sorting data accessors
const sortingDataAccessor = {
  nestedProperty
};

export default sortingDataAccessor;
