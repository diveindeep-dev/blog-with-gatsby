import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../layouts';
import { Markdown } from '../styles/Markdown';

const Post = (props) => {
  const { frontmatter, html } = props.data.markdownRemark;

  return (
    <Layout>
      <section>
        <div>{frontmatter.title}</div>
        <div>{frontmatter.date}</div>
      </section>
      <section>
        <Markdown dangerouslySetInnerHTML={{ __html: html }} />
      </section>
    </Layout>
  );
};

export const pageQuery = graphql`
  query ($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        nav
        title
        icon {
          childImageSharp {
            fixed {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
      html
      excerpt
    }
  }
`;

export default Post;
