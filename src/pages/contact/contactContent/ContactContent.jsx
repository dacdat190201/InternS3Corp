import React from 'react';
import './ContactContent.css';
import RightContent from './RightContent';

function ContactContent() {
    return (
        <div className="contact__content">
            <div className="contact-left">
                <div className="contact__title-main">
                    <div className="right-icon">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="40" height="40" rx="20" fill="#DB4444" />
                            <path
                                d="M18.5542 14.24L15.1712 10.335C14.7812 9.885 14.0662 9.887 13.6132 10.341L10.8312 13.128C10.0032 13.957 9.76623 15.188 10.2452 16.175C13.1069 22.1 17.8853 26.8851 23.8062 29.755C24.7922 30.234 26.0222 29.997 26.8502 29.168L29.6582 26.355C30.1132 25.9 30.1142 25.181 29.6602 24.791L25.7402 21.426C25.3302 21.074 24.6932 21.12 24.2822 21.532L22.9182 22.898C22.8484 22.9712 22.7565 23.0194 22.6566 23.0353C22.5567 23.0512 22.4543 23.0339 22.3652 22.986C20.1357 21.7021 18.2862 19.8502 17.0052 17.619C16.9573 17.5298 16.9399 17.4272 16.9558 17.3272C16.9717 17.2271 17.02 17.135 17.0932 17.065L18.4532 15.704C18.8652 15.29 18.9102 14.65 18.5542 14.239V14.24Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <div className="Pop16-500 text-black">Call to us</div>
                    </div>
                    <h3>We are available 24/7, 7 days a week.</h3>
                    <h3>Phone: +8455523121547</h3>
                </div>
                <hr></hr>
                <div className="contact__title-main">
                    <div className="right-icon">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="40" height="40" rx="20" fill="#DB4444" />
                            <path
                                d="M10 13L20 20L30 13M10 27H30V13H10V27Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                        <div className="Pop16-500 text-black">Write to US</div>
                    </div>
                    <h3>Fill out our form and we will contact you within 24 hours.</h3>
                    <h3>Email: email@gmail.com</h3>
                    <h3>Email: h@email.com.vn</h3>
                </div>
            </div>
            <div className="contact-right">
                <RightContent />
            </div>
        </div>
    );
}

export default ContactContent;
