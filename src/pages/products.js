import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/layout';

const Products = ({ data: { allContentfulProduct } }) => (
  <Layout>
    <div>
      <h2>Garb Products</h2>
      {allContentfulProduct.edges.map(({ node: product }) => (
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
