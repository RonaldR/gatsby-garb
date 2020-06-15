import React, { useState, useEffect } from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import netlifyIdentity from 'netlify-identity-widget';

import Layout from '../components/layout';

const Products = ({ data: { allContentfulProduct } }) => {
  const [products, setProducts] = useState([]);

  const getProducts = () =>
    netlifyIdentity.currentUser() !== null
      ? allContentfulProduct.edges
      : allContentfulProduct.edges.filter(
          ({ node: product }) => !product.private
        );

  useEffect(() => {
    setProducts(getProducts());

    netlifyIdentity.on('login', () => getProducts());
    netlifyIdentity.on('logout', () => getProducts());
  }, []);

  return (
    <Layout>
      <div>
        <h2>Garb Products</h2>
        {products.map(({ node: product }) => (
          <div key={product.id}>
            <h2>
              <Link to={`/products/${product.slug}`}>
                {product.name} | &euro; {product.price}
              </Link>
            </h2>
            <Img style={{ maxWidth: 240 }} fluid={product.image.fluid} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Products;

export const query = graphql`
  query {
    allContentfulProduct {
      edges {
        node {
          slug
          id
          name
          price
          private
          image {
            fluid(maxWidth: 800) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`;
