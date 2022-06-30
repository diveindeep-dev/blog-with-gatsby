import React, { useContext, useEffect, useState } from 'react';
import ThemeContext from '../store/ThemeContext';
import Nav from '../components/LinkButton';
import Switch from '../components/ToggleButton';
import styled from 'styled-components';
import { font } from '../styles/Variables';
import { container, media, FlexWrapper } from '../styles/Mixin';

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  background-color: ${(props) => props.theme.bg};
  font-family: ${font.header};
`;

const HeaderContainer = styled.div`
  ${container}
  justify-content: space-between;
  height: ${(props) => (props.isScrolled ? `90px` : `150px`)};
  transition: height 0.2s ease;

  nav {
    display: flex;
  }

  ${media.mobile} {
    flex-direction: ${(props) => !props.isScrolled && `column`};
    justify-content: ${(props) => !props.isScrolled && `space-around`};
    height: ${(props) => (props.isScrolled ? `60px` : `120px`)};
  }
`;

const HeaderLayout = (props) => {
  const { title, navArray } = props;
  const { state, dispatch } = useContext(ThemeContext);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!isScrolled && window.scrollY > 30) {
        setIsScrolled(true);
      } else if (isScrolled && window.scrollY <= 30) {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);

  const navList = navArray.map((nav, i) => {
    return (
      <Nav
        key={i}
        path={nav.link}
        name={nav.name}
        type={`circle`}
        isScrolled={isScrolled}
      />
    );
  });

  return (
    <Header>
      <HeaderContainer isScrolled={isScrolled}>
        <Nav path="/" name={title} type="logo" isScrolled={isScrolled} />
        <FlexWrapper>
          <nav>{navList}</nav>
          <Switch
            handleToggle={() => dispatch({ type: 'TOGGLE_MODE' })}
            type={`switch`}
            isChecked={state.mode === 'light'}
          />
        </FlexWrapper>
      </HeaderContainer>
    </Header>
  );
};

export default HeaderLayout;
