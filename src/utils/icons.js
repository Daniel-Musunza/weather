import React from 'react';

import {faPenToSquare, faEyeSlash} from '@fortawesome/free-regular-svg-icons'
import { faAngleDown ,faXmark, faBars, faRss ,faAngleUp,faSearch, faArrowLeft, faTrash, faLocationDot} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTwitter, faFacebook,faTiktok, faPinterest , faYoutube, faInstagram, faTumblr}from '@fortawesome/free-brands-svg-icons'



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
  location: <FontAwesomeIcon icon={faLocationDot} />,
  twitter: <FontAwesomeIcon icon={faTwitter} />,
  facebook: <FontAwesomeIcon icon={faFacebook} />,
  pininterest: <FontAwesomeIcon icon={faPinterest} />,
  youtube: <FontAwesomeIcon icon={faYoutube} />,
  insta: <FontAwesomeIcon icon={faInstagram} />,
  tumblr: <FontAwesomeIcon icon={faTumblr} />,
  rss: <FontAwesomeIcon icon={faRss} />,
  tiktok: <FontAwesomeIcon icon={faTiktok} />,
 
}

export default icons