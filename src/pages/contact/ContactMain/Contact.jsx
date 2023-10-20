import React from 'react';
import './Contact.css';
import ContactContent from '../contactContent/ContactContent';
function Contact() {
    return (
        <div>
            <hr></hr>
            <div className="main__contact">
                <div className="contact__top">
                    Home/<p>Contact</p>
                </div>
                <ContactContent />
            </div>
        </div>
    );
}

export default Contact;
