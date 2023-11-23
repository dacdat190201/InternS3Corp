import React from 'react';
import './Contact.css';
import ContactContent from '../contactContent/ContactContent';
import BreadcurmbNavigation from '../../../component/common/BreadcurmbNavigation';

function Contact() {
    return (
        <div className="main__contact">
            <BreadcurmbNavigation props="Contact" />
            <ContactContent />
        </div>
    );
}

export default Contact;
