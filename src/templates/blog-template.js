import React from 'react';
import { /*useStaticQuery,*/ graphql, Link } from 'gatsby';
import Layout from '../components/layout';

// const getMarkDownPosts = graphql`
//   query Page {
//     allMarkdownRemark {
//       totalCount
//       edges {
//         node {
//           html
//           frontmatter {
//             date
//             title
//           }
//           excerpt(truncate: true, pruneLength: 11)
//           fields {
//             slug
//           }
//         }
//       }
//     }
//   }
// `;

export default ({
  data,
  pageContext: { currentPage, isFirstPage, isLastPage, totalPages },
}) => {
  // const data = useStaticQuery(getMarkDownPosts);

  const nextPage = `/blog/${String(currentPage + 1)}`;
  const prevPage =
    currentPage - 1 === 1 ? '/blog' : `/blog/${String(currentPage - 1)}`;

  return (
    <Layout>
      <article>
        <h1>GATSBY BLOG</h1>
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div>
            <h3>
              <Link key={node.id} to={`/posts${node.fields.slug}`}>
                {node.frontmatter.title} <span>- {node.frontmatter.date}</span>
              </Link>
            </h3>

            <p>{node.excerpt}</p>
            <small>Time to read: {node.timeToRead} minute(s)</small>
          </div>
        ))}
        =Pagination=
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            maxWidth: 300,
            margin: '0 auto',
          }}
        >
          {!isFirstPage && (
            <Link to={prevPage} rel="prev">
              Prev page
            </Link>
          )}
          {Array.from({ length: totalPages }, (_, index) => (
            <Link to={`/blog/${index === 0 ? '' : index + 1}`} key={index}>
              {index + 1}
            </Link>
          ))}
          {!isLastPage && (
            <Link to={nextPage} rel="next">
              Next page
            </Link>
          )}
        </div>
      </article>
    </Layout>
  );
};

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      skip: $skip
      limit: $limit
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          timeToRead
          frontmatter {
            date(formatString: "DD-MM-YYYY")
            title
          }
          excerpt(truncate: true, pruneLength: 20)
          fields {
            slug
          }
        }
      }
    }
  }
`;
