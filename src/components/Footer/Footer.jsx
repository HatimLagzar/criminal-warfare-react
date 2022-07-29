import { Link } from 'react-router-dom';

import './Footer.scss';
import FooterContainer from './FooterContainer';

const Footer = () => {
  return (
    <div className='footer'>
      <FooterContainer className='left'>
        © 2022 <Link to='/'>Criminal Warfare</Link>.
      </FooterContainer>
      <FooterContainer className='right'>
        <Link to='/tos.php'>Terms of Service</Link> |{' '}
        <Link to='https://discord.gg/CGneSxSDjD'>Discord</Link>
      </FooterContainer>
    </div>
  );
};

export default Footer;
