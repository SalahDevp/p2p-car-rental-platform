import './DashboardFleet.scss';
import vwPolo from '../assets/vwPolo.png';
import tucson from '../assets/tucson.png';
import corolla from '../assets/corolla.png';
import gear from '../assets/gear.png';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import LuggageIcon from '@mui/icons-material/Luggage';
import { useSelector } from 'react-redux';

export default function DashboardFleet({ contract }) {
  const currentAddress = useSelector((state) => state.currentAddress.address);

  const pickUpHandler = async () => {
    const pickUp = await contract.pickUp(currentAddress);
    await pickUp.wait();
    window.location.reload();
  };

  const dropOffHandler = async () => {
    const dropOff = await contract.dropOff(currentAddress);
    await dropOff.wait();
    window.location.reload();
  };
  return (
    <div className='container dashboard-fleet'>
      <div className='fleet-container'>
        <div className='car-container car1'>
          <img className='car-img' src={vwPolo} alt='vw Polo' />
          <div className='car-description'>
            <ul>
              <li>
                <AirlineSeatReclineExtraIcon />5 seats
              </li>
              <li>
                <img className='gear-icon' src={gear} alt='gear icon' />
                manual
              </li>
              <li>
                <LuggageIcon />1 bag
              </li>
            </ul>
          </div>
          <div className='button-box'>
            <button
              className='button-class rent-car-button'
              type='submit'
              onClick={() => pickUpHandler()}
            >
              Pick Up
            </button>
            <button
              className='button-class rent-car-button'
              type='submit'
              onClick={() => dropOffHandler()}
            >
              Drop off
            </button>
          </div>
        </div>
        <div className='car-container car2'>
          <img className='car-img' src={tucson} alt='hyundai tucson' />
          <div className='car-description'>
            <ul>
              <li>
                <AirlineSeatReclineExtraIcon />5 seats
              </li>
              <li>
                <img className='gear-icon' src={gear} alt='gear icon' />
                manual
              </li>
              <li>
                <LuggageIcon />2 bags
              </li>
            </ul>
          </div>
          <div className='button-box '>
            <button
              className='button-class rent-car-button'
              type='submit'
              onClick={() => pickUpHandler()}
            >
              Pick Up
            </button>
            <button
              className='button-class rent-car-button'
              type='submit'
              onClick={() => dropOffHandler()}
            >
              Drop off
            </button>
          </div>
        </div>
        <div className='car-container car3'>
          <img className='car-img smaller' src={corolla} alt='toyota corolla' />

          <div className='car-description'>
            <ul>
              <li>
                <AirlineSeatReclineExtraIcon />5 seats
              </li>
              <li>
                <img className='gear-icon' src={gear} alt='gear icon' />
                automatic
              </li>
              <li>
                <LuggageIcon className='luggage' />1 bag
              </li>
            </ul>
          </div>
          <div className='button-box'>
            <button
              className='button-class rent-car-button'
              type='submit'
              onClick={() => pickUpHandler()}
            >
              Pick Up
            </button>
            <button
              className='button-class rent-car-button'
              type='submit'
              onClick={() => dropOffHandler()}
            >
              Drop off
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
