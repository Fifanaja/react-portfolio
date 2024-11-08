import { useEffect, useRef } from 'react';
import Logoff from '../../../assets/images/fg.png';
import './index.scss';

const Logo = () => {
  const bgRef = useRef();
  const outlineLogoRef = useRef();
  const solidLogoRef = useRef();

  useEffect(() => {
    bgRef.current.classList.add('fade-in');
    outlineLogoRef.current.classList.add('draw-outline');
    solidLogoRef.current.classList.add('fade-in-delay');
  }, []);

  return (
    <div className="page-container">
      <div className="logo-container" ref={bgRef}>
        <img
          className="solid-logo"
          ref={solidLogoRef}
          src={Logoff}
          alt="JavaScript, Developer"
        />
        <svg
          width="559pt"
          height="897pt"
          version="1.0"
          viewBox="0 0 559 897"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            className="svg-container"
            transform="translate(0 457) scale(.1 -.1)"
            fill="none"
          >
            <path
              ref={outlineLogoRef}
              d="m2930 4560c-344-16-623-85-915-228-231-114-406-241-600-436-61-60-145-137-188-169..."
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default Logo;
