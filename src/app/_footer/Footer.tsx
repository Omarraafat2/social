import React from 'react';
import Link from 'next/link';
import { styled } from '@mui/system';

const FooterSection = styled('footer')`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;

const FooterRow = styled('div')`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const FooterCol = styled('div')`
  width: calc(25% - 20px);
  margin-bottom: 30px;

  h4 {
    font-size: 18px;
    margin-bottom: 15px;
    border-bottom: 2px solid transparent; /* Transparent border bottom for title */
    padding-bottom: 5px;
    transition: border-color 0.3s ease; /* Smooth transition for border color */
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
    font-size: 14px;
    transition: color 0.3s ease;
    cursor: pointer;
    color: #ccc; /* Default link color */
  }

  li:hover {
    color: #ffcc00; /* Yellow color on hover */
  }

  /* Remove underline from links */
  a {
    text-decoration: none;
    color: inherit; /* Inherit color from parent */
    transition: color 0.3s ease;
  }

  a:hover {
    color: #ffcc00; /* Yellow color on hover */
  }

  p {
    font-size: 14px;
    line-height: 1.6;
  }
`;

const Footer = () => {
  return (
    <FooterSection sx={{paddingX:'8px'}}>
      <div className="container">
        <FooterRow>
          <FooterCol>
            <h4>Info</h4>
            <ul className="links">
              <li><Link href="#">About Us</Link></li>
              <li><Link href="#">Compressions</Link></li>
              <li><Link href="#">Customers</Link></li>
              <li><Link href="#">Service</Link></li>
              <li><Link href="#">Collection</Link></li>
            </ul>
          </FooterCol>
          <FooterCol>
            <h4>Explore</h4>
            <ul className="links">
              <li><Link href="#">Free Designs</Link></li>
              <li><Link href="#">Latest Designs</Link></li>
              <li><Link href="#">Themes</Link></li>
              <li><Link href="#">Popular Designs</Link></li>
              <li><Link href="#">Art Skills</Link></li>
              <li><Link href="#">New Uploads</Link></li>
            </ul>
          </FooterCol>
          <FooterCol>
            <h4>Legal</h4>
            <ul className="links">
              <li><Link href="#">Customer Agreement</Link></li>
              <li><Link href="#">Privacy Policy</Link></li>
              <li><Link href="#">GDPR</Link></li>
              <li><Link href="#">Security</Link></li>
              <li><Link href="#">Testimonials</Link></li>
              <li><Link href="#">Media Kit</Link></li>
            </ul>
          </FooterCol>
          <FooterCol>
            <h4>Newsletter</h4>
            <p>
              Subscribe to our newsletter for a weekly dose
              of news, updates, helpful tips, and
              exclusive offers.
            </p>
          </FooterCol>
        </FooterRow>
      </div>
    </FooterSection>
  );
};

export default Footer;
