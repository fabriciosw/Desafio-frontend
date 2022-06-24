import React from 'react';
import Section from '../../components/Section';
import Text from '../../components/Text';
import gif from '../../statics/404.gif';
import style from './styles.module.scss';

const Error: React.FunctionComponent = () => (
  <Section className='d-flex flex-column'>
    <Text as="h1">Está perdido, amigo ?</Text>
    <img src={gif} alt="Fantasma com a mensagem '404 error'" className={style.gif_404} />
    <Text as="strong">Talvez você queira <a href='/login'>fazer seu login</a></Text>
  </Section>
);

export default Error;
