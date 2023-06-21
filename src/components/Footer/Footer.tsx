import React from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai';
import { FaFacebook } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footerSocial'>
        <div className='footerSocialAbout'>
          <div className='footerSocialCompany'>
            <ul>
              <p className='footerSocialAboutTitles'>Company</p>
              <li>
                <Link target="_blank" to='https://www.spotify.com/ge/about-us/contact/'>
                    <span>About</span>
                </Link>
              </li>
              <li>
                <Link target="_blank" to='https://www.lifeatspotify.com/'>
                  <span>Jobs</span>
                </Link>
              </li>
              <li>
                <Link target="_blank" to='https://newsroom.spotify.com/'>
                  <span>For the Record</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className='footerSocialCommunities'>
            <ul>
              <p className='footerSocialAboutTitles'>Communities</p>
              <li>
                <Link target="_blank" to='https://artists.spotify.com/home'>
                    <span>For Artists</span>
                </Link>
              </li>
              <li>
                <Link target="_blank" to='https://developer.spotify.com/'>
                  <span>Jobs</span>
                </Link>
              </li>
              <li>
                <Link target="_blank" to='https://ads.spotify.com/en-US/'>
                  <span>Advertising</span>
                </Link>
              </li>
              <li>
                <Link target="_blank" to='https://investors.spotify.com/home/default.aspx'>
                  <span>Investors</span>
                </Link>
              </li>
              <li>
                <Link target="_blank" to='https://spotifyforvendors.com/'>
                  <span>Vendors</span>
                </Link>
              </li>
              <li>
                <Link target="_blank" to='https://www.spotify.com/ge/spotifyforwork/'>
                  <span>Spotify for Work</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className='footerSocialUsefulLinks'>
            <ul>
              <p className='footerSocialAboutTitles'>Useful links</p>
              <li>
                <Link to='https://support.spotify.com/'>
                    <span>Support</span>
                </Link>
              </li>
              <li>
                <Link to='https://www.spotify.com/ge/download/'>
                  <span>Free Mobile App</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='footerSocialIcons'>
          <Link target="_blank" to='https://www.instagram.com/spotify/'>
            <AiOutlineInstagram />
          </Link>
          <Link target="_blank" to='https://twitter.com/spotify'>
            <AiOutlineTwitter />
          </Link>
          <Link target="_blank" to='https://www.facebook.com/Spotify'>
            <FaFacebook />
          </Link>
        </div>
      </div>

      <div className='footerPrivacy'>
        <div className='footerPrivacyLeftSide'>
          <div>
            <Link target="_blank" to='https://www.spotify.com/ge/legal/'>Legal</Link>
          </div>
          <div>
            <Link target="_blank" to='https://www.spotify.com/ge/privacy'>Privacy Center</Link>
          </div>
          <div>
            <Link target="_blank" to='https://www.spotify.com/ge/legal/privacy-policy/'>Privact Policy</Link>
          </div>
          <div>
            <Link target="_blank" to='https://www.spotify.com/ge/legal/cookies-policy/'>Cookies</Link>
          </div>
          <div>
            <Link target="_blank" to='https://www.spotify.com/ge/legal/privacy-policy/#s3'>About Ads</Link>
          </div>
          <div>
            <Link target="_blank" to='https://www.spotify.com/ge/accessibility'>Accessibility</Link>
          </div>
        </div>

        <div>
          <p>© 2023 Spotify AB</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;