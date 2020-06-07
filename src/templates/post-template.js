import React from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby';

const PostTemplate = ({ data: post }) => (
  <Layout>
    <article>
      <h2>
        {post.markdownRemark.frontmatter.title} -{' '}
        {post.markdownRemark.frontmatter.date}
      </h2>
      <secion dangerouslySetInnerHTML={{ __html: post.markdownRemark.html }} />
    </article>
  </Layout>
);

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
      }
    }
  }
`;

export default PostTemplate;
