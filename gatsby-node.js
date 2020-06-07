/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

const PostTemplate = path.resolve('./src/templates/post-template.js');
const BlogTemplate = path.resolve('./src/templates/blog-template.js');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'posts' });
    createNodeField({ node, name: 'slug', value: slug });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allMarkdownRemark(
        limit: 9999
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  const posts = result.data.allMarkdownRemark.edges;
  posts.forEach(({ node }) => {
    createPage({
      path: `posts${node.fields.slug}`,
      component: PostTemplate,
      context: {
        slug: node.fields.slug,
      },
    });
  });

  const postPerPage = 2;
  const totalPages = Math.ceil(posts.length / postPerPage);

  Array.from({ length: totalPages }).forEach((_, index) => {
    const currentPage = index + 1;
    const isFirstPage = index === 0;
    const isLastPage = currentPage === totalPages;

    createPage({
      path: isFirstPage ? '/blog' : `/blog/${currentPage}`,
      component: BlogTemplate,
      context: {
        limit: postPerPage,
        skip: index * postPerPage,
        isFirstPage,
        isLastPage,
        currentPage,
        totalPages,
      },
    });
  });
};
