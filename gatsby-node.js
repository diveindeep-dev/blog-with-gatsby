const path = require('path');
const _ = require('lodash');

module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = path.basename(node.fileAbsolutePath, '.md');

    createNodeField({
      node,
      name: 'slug',
      value: _.kebabCase(slug),
    });
  }
};

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve('./src/templates/post.js');

  const markdownBlog = await graphql(`
    query {
      allMarkdownRemark(filter: { frontmatter: { nav: { eq: "blog" } } }) {
        edges {
          node {
            frontmatter {
              tags
              category
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  const postEdges = markdownBlog.data.allMarkdownRemark.edges;

  postEdges.forEach((edge) => {
    createPage({
      component: postTemplate,
      path: `blog/${edge.node.fields.slug}`,
      context: { slug: edge.node.fields.slug },
    });
  });
};
