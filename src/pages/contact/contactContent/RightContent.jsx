import React, { useRef, useState } from 'react';
import './ContactContent.css';
function RightContent() {
    const formRef = useRef(null);
    const scriptUrl =
        'https://script.google.com/macros/s/AKfycbw4cSRFl0uKNwxhllFF9z9KH-74rXQrko1p0jSXUPBzu5wXCQ60JdWfA9yphKfZCRsI/exec';
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        fetch(scriptUrl, {
            method: 'POST',
            body: new FormData(formRef.current),
        })
            .then((res) => {
                console.log('SUCCESSFULLY SUBMITTED');
                setLoading(false);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="container">
            <form ref={formRef} onSubmit={handleSubmit} name="google-sheet">
                <div className="a1">
                    <input type="text" id="Name" name="Name" placeholder="Your Name *" autoComplete="family-name" />
                    <input type="text" name="Email" placeholder="Your Email *" id="Email" autoComplete="email" />
                    <input type="text" placeholder="Your phone" name="Phone" id="Phone" autoComplete="tel" />
                </div>
                <div className="a2">
                    <textarea placeholder="Your Message" name="Message" />
                </div>

                <div className="a3">
                    <button>{loading ? 'Loading...' : 'SEND MESSAGE'}</button>
                </div>
            </form>
            <div className="Link__googlesheet">
                https://docs.google.com/spreadsheets/d/1DFfcZs2EGw1UHTncIDt1Y1gYtb54LF873mDTT3Oea3M/edit#gid=0
            </div>
        </div>
    );
}
export default RightContent;
