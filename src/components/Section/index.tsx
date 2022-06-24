import React from 'react';
import { Container } from 'react-bootstrap';
import classnames from 'classnames';

interface ISection {
  className?: string;
  children: React.ReactNode | React.ReactNode[];
}

const Section: React.FunctionComponent<ISection> = ({
  children,
  className,
}): React.ReactElement => (
    <section className={classnames('section mt-4 pt-3 pb-3')}>
      <Container className={className}>{children}</Container>
    </section>
);

Section.defaultProps = { className: '' };

export default Section;
