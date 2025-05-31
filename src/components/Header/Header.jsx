import React from 'react';
import babyImage from '../../assets/images/evy-1.jpg';
import './Header.css';
import { ReactTyped } from "react-typed";

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="text-container">
          <ReactTyped
            strings={['Xin chào cả nhà, em tên là <span style="color: #3498db;">Phương (Valeria) Vy</span>, tên ở nhà là <span style="color: #3498db;">Evy</span>']}
            typeSpeed={40}
            className="typed-text greeting"
            typedRef={(typed) => {
              typed?.cursor?.style?.setProperty('color', '#fff');
            }}
          />
          <br />
          <ReactTyped
            strings={[
              'Con của <span style="color: #FFFF00;">ba Hiếu</span>',
              'Con của <span style="color: #FFFF00;">mẹ Tiền</span>',
              'Cháu nội <span style="color: #FFFF00;">ông Dưỡng bà Vui</span>',
              'Cháu ngoại <span style="color: #FFFF00;">ông Nhân bà Bộ</span>'
            ]}
            typeSpeed={40}
            backSpeed={50}
            loop
            className="typed-text family"
          />
        </div>
        <div className="image-container">
          <img src={babyImage} alt="Phương (Valeria) Vy" className="header-image" />
        </div>
      </div>
    </header>
  );
}

export default Header;