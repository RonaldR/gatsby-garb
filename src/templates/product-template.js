import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/layout';

const ProductTemplate = ({ data: { contentfulProduct }, location }) => {
  return (
    <Layout>
      <div
        style={{
          marginLeft: '0 auto',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <h2>
          {contentfulProduct.name}{' '}
          <span style={{ color: '#ccc' }}>{contentfulProduct.createdAt}</span>
        </h2>
        <p>
          <strong>&euro; {contentfulProduct.price}</strong>
        </p>
        <button
          style={{
            background: 'darkorange',
            color: 'white',
            padding: '0.3em',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          className="snipcart-add-item"
          data-item-id={contentfulProduct.id}
          data-item-price={contentfulProduct.price}
          data-item-image={contentfulProduct.image.file.url}
          data-item-name={contentfulProduct.name}
          data-item-url={location.pathname}
        >
          Add to Cart
        </button>
        <p>{contentfulProduct.description}</p>
        <Img
          fluid={contentfulProduct.image.fluid}
          style={{ margin: '0 auto', maxWidth: 600 }}
        />
      </div>
    </Layout>
  );
};

export default ProductTemplate;

export const query = graphql`
  query($slug: String!) {
    contentfulProduct(slug: { eq: $slug }) {
      id
      name
      price
      description
      createdAt(formatString: "MM-DD-YYYY")
      image {
        fluid(maxWidth: 800) {
          ...GatsbyContentfulFluid
        }
        file {
          url
        }
      }
    }
  }
`;
