import logo from '../../../../assets/img/layout/logo.png';
import FlexEle from '../../FlexElement/FlexElement';
import './Logo.scss';

let Logo = () => {
  return (
    <FlexEle className='text-center'>
      <img className='logo' src={logo} />
    </FlexEle>
  );
};

export default Logo;
