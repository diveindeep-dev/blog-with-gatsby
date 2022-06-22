import * as React from 'react';
import Nav from '../components/LinkButton';

const HeaderLayout = (props) => {
  const { navArray } = props;

  const navList = navArray.map((nav, i) => {
    return <Nav key={i} path={nav.link} name={nav.name} />;
  });

  return (
    <header>
      <nav>{navList}</nav>
    </header>
  );
};

export default HeaderLayout;
