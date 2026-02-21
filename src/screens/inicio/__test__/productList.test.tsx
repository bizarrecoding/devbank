import * as React from 'react';
import ProductList from '../ProductList'
import render from '../../../../test-utils/wrappedRender';

const products = [
  { id: "123", name: 'Product 1', description: "Description for Product 1", logo:"-", date_release:"2026-01-01", date_revision: "2027-01-01" },
  { id: "124", name: 'Product 2', description: "Description for Product 2", logo:"-", date_release:"2026-01-02", date_revision: "2027-01-02" },
];

beforeAll(()=>{
  jest.mock('@react-native-vector-icons/fontawesome6', () => {
    return {
      Icon: () => null, // Mock the Icon component
    };
  });
})

describe('ProductList', () => {
  it('should render the product list correctly', () => {
    const { getByText } = render(<ProductList products={products} />);

    expect(getByText('Product 1')).toBeVisible();
    expect(getByText('ID: 123')).toBeVisible();
    expect(getByText('Product 2')).toBeVisible();
    expect(getByText('ID: 124')).toBeVisible();
  });

  it('should render no products message when the list is empty', () => {
    const { getByText } = render(<ProductList products={[]} />);
    
    expect(getByText('No hay productos disponibles')).toBeVisible();
  });

  it('should render no products found message when filter does not match', () => {
    const { getByText } = render(<ProductList products={products} filter="Nonexistent" />);
  
    expect(getByText('No se encontraron productos')).toBeVisible();
  });

  it('should filter products based on the filter prop', () => {
    const { queryByText } = render(<ProductList products={products} filter="Product 1" />);
  
    expect(queryByText('Product 1')).toBeVisible();
    expect(queryByText('ID: 123')).toBeVisible();
    expect(queryByText('Product 2')).toBeNull();
    expect(queryByText('ID: 124')).toBeNull();
  });
});
 