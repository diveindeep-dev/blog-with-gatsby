import React, { useContext } from 'react';
import ThemeContext from '../store/ThemeContext';
import Nav from '../components/LinkButton';
import Switch from '../components/ToggleButton';

const HeaderLayout = (props) => {
  const { navArray } = props;
  const { state, dispatch } = useContext(ThemeContext);

  const navList = navArray.map((nav, i) => {
    return <Nav key={i} path={nav.link} name={nav.name} />;
  });

  return (
    <header>
      <nav>{navList}</nav>
      <Switch
        handleToggle={() => dispatch({ type: 'TOGGLE_MODE' })}
        type={`switch`}
        isChecked={state.mode === 'light'}
      />
    </header>
  );
};

export default HeaderLayout;
