import React from 'react';
import Layout from '../layouts';
import TopSection from '../components/TopSection';
import { graphql, Link } from 'gatsby';

const IndexPage = (props) => {
  const { siteData, latestPost, posts, notes } = props.data;

  const listItem = latestPost.edges.map((edge, i) => {
    const { fields, frontmatter } = edge.node;

    const tagList = frontmatter.tags.map((tag, i) => {
      return <li key={i}>{tag}</li>;
    });

    return (
      <li key={i}>
        <Link to={`/blog/${fields.slug}`}>{frontmatter.title}</Link>
        <ul>{tagList}</ul>
      </li>
    );
  });

  return (
    <Layout>
      <TopSection
        title={siteData.siteMetadata.title}
        count={{ post: posts.totalCount, note: notes.totalCount }}
      />
      <section>
        <h2>Latest Blog Posts</h2>
        <ol>{listItem}</ol>
      </section>
    </Layout>
  );
};

export const pageQuery = graphql`
  query IndexQuery {
    siteData: site {
      siteMetadata {
        title
      }
    }

    latestPost: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { nav: { eq: "blog" } } }
      limit: 5
    ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
          }
          fields {
            slug
          }
        }
      }
    }

    posts: allMarkdownRemark(filter: { frontmatter: { nav: { eq: "blog" } } }) {
      totalCount
    }

    notes: allMarkdownRemark(filter: { frontmatter: { nav: { eq: "note" } } }) {
      totalCount
    }
  }
`;
export default IndexPage;
