import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Header from './Header';
import Footer from './Footer';
import ThemeContext from '../store/ThemeContext';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/GlobalStyle';
import { darkTheme, lightTheme } from '../styles/Theme';

const Layout = (props) => {
  const { children } = props;
  const { state } = useContext(ThemeContext);
  const setTheme = state.mode === 'dark' ? darkTheme : lightTheme;

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
    <ThemeProvider theme={setTheme}>
      <GlobalStyle />
      <Header
        title={data.site.siteMetadata.title}
        navArray={data.site.siteMetadata.nav}
      />
      <main id="main">{children}</main>
      <Footer author={data.site.siteMetadata.author} />
    </ThemeProvider>
  );
};

export default Layout;
