import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Header from './Header';
import Footer from './Footer';

const Layout = (props) => {
  const { children } = props;

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          author
          nav {
            name
            link
          }
        }
      }
    }
  `);

  return (
    <>
      <Header
        title={data.site.siteMetadata.title}
        navArray={data.site.siteMetadata.nav}
      />
      <main id="main">{children}</main>
      <Footer author={data.site.siteMetadata.author} />
    </>
  );
};

export default Layout;
