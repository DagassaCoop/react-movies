import React from 'react';
import * as RBS from 'react-bootstrap';

import '@/assets/styles/components/shared/footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className='footer'>
      <RBS.Container>
        <div className='footer__content'>
          <p>© 2024 React Movies, dagas_sa</p>
        </div>
      </RBS.Container>
    </footer>
  );
};

export default Footer;
