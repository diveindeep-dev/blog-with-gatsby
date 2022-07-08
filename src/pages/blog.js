import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../layouts';
import BasicList from '../components/lists/Basic';

const BlogPage = (props) => {
  const { posts } = props.data;

  return (
    <Layout>
      <section>
        <BasicList postEdges={posts.edges} />
      </section>
    </Layout>
  );
};

export const pageQuery = graphql`
  query BlogQuery {
    posts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { nav: { eq: "blog" } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            nav
            tags
            category
            icon {
              childImageSharp {
                gatsbyImageData(width: 35)
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default BlogPage;
