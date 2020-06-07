import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import Layout from '../components/layout';

const getImageData = graphql`
  {
    allFile {
      totalCount
      edges {
        node {
          prettySize
          relativePath
          extension
          birthtime
        }
      }
    }
  }
`;

export default () => {
  const data = useStaticQuery(getImageData);

  return (
    <Layout>
      <h1>Page 3!</h1>
      <Link to="/page-2">Page 2</Link>

      <h3>file data</h3>
      <table>
        <thead>
          <tr>
            <th>relativePath</th>
            <th>prettySize</th>
            <th>extension</th>
            <th>birthtime</th>
          </tr>
          {data.allFile.edges.map(({ node }, index) => (
            <tr key={index}>
              <td>{node.relativePath}</td>
              <td>{node.prettySize}</td>
              <td>{node.extension}</td>
              <td>{node.birthtime}</td>
            </tr>
          ))}
        </thead>
      </table>
    </Layout>
  );
};
