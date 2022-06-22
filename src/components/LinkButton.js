import * as React from 'react';
import { Link } from 'gatsby';

const LinkButton = (props) => {
  const { name, path } = props;

  return <Link to={path}>{name}</Link>;
};

export default LinkButton;
