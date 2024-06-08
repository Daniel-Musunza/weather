import {faPenToSquare, faEyeSlash} from '@fortawesome/free-regular-svg-icons'
import { faAngleDown ,faXmark, faBars, faAngleUp,faSearch, faArrowLeft, faTrash, faLocationDot} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const icons =  {
  angleDown: <FontAwesomeIcon icon={faAngleDown} />,
  markX: <FontAwesomeIcon icon={faXmark}/>,
  bars: <FontAwesomeIcon icon={faBars} />,
  angleUp: <FontAwesomeIcon icon={faAngleUp} />,
  arrowLeft:<FontAwesomeIcon icon={faArrowLeft}/>,
  delete: <FontAwesomeIcon icon={faTrash} />,
  edit: <FontAwesomeIcon icon={faPenToSquare} />,
  eyeSlash: <FontAwesomeIcon icon={faEyeSlash} />,
  search: <FontAwesomeIcon icon={faSearch} />,
  location: <FontAwesomeIcon icon={faLocationDot} />
 
}

export default icons