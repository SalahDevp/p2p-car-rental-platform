import './Navbar.scss';
import metamaskLogo from '../assets/metamask.png';
import { Link } from 'react-router-dom';
import ethereum from '../assets/ethereum.png';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const connected = useSelector((state) => state.connector.connected);
  const registered = useSelector((state) => state.registrator.registered);
  const currentAddress = useSelector((state) => state.currentAddress.address);

  const slicedAddress =
    currentAddress.slice(0, 5) + '...' + currentAddress.slice(38, 44);

  const connectWalletReload = () => {
    if (!connected) {
      window.location.reload();
    }
  };
  return (
    <div className='navbar'>
      <div className='navbar-wrapper'>
        <div className='left'>
          <Link to='/' className='left-logo'>
            <img className='logo-img' src={ethereum} alt='ethereumLogo' />
          </Link>
        </div>
        <div className='middle'></div>
        <Link style={{ textDecoration: 'none' }} to='/dashboard'>
          <div className='right'>
            <img src={metamaskLogo} alt='metamaskLog'></img>
            {!connected ? (
              <p onClick={connectWalletReload}>connect wallet</p>
            ) : (
              <p>{slicedAddress}</p>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}
