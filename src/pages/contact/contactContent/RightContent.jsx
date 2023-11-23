import React, { useRef, useState } from 'react';
import './ContactContent.css';
import ButtonView from '../../../component/common/ButtonView';
import { ShowAlert } from '../../../utils/ToastAlert';
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
                ShowAlert('Send Message Success');
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="right__content">
            <form ref={formRef} onSubmit={handleSubmit} name="google-sheet">
                <div className="a1">
                    <div className="form-floating mb-4 shadow-none ">
                        <input
                            type="text"
                            id="Name"
                            name="Name"
                            className="form-control shadow-none"
                            placeholder="name@example.com"
                            autoComplete="family-name"
                        />
                        <label className="text-secondary" htmlFor="Name">
                            Your Name <span className="text-danger">*</span>
                        </label>
                    </div>
                    <div className="form-floating mb-4">
                        <input
                            type="email"
                            name="Email"
                            id="Email"
                            className="form-control shadow-none"
                            placeholder="name@example.com"
                            autoComplete="email"
                        />
                        <label className="text-secondary" htmlFor="Email">
                            Your Email <span className="text-danger">*</span>
                        </label>
                    </div>
                    <div className="form-floating mb-4">
                        <input
                            maxLength={10}
                            type="text"
                            className="form-control shadow-none"
                            name="Phone"
                            id="Phone"
                            autoComplete="tel"
                            placeholder="name@example.com"
                        />
                        <label className="text-secondary" htmlFor="Phone">
                            Your Phone <span className="text-danger">*</span>
                        </label>
                    </div>
                </div>

                <div className="a2 mb-4">
                    <div className="form-floating">
                        <textarea
                            className="form-control shadow-none"
                            placeholder="Leave a comment here"
                            id="floatingTextarea2"
                            style={{ height: 207 }}
                            name="Message"
                        ></textarea>
                        <label className="text-secondary" htmlFor="Message">
                            Your Message <span className="text-danger">*</span>
                        </label>
                    </div>
                </div>
                <div className="a3">
                    <ButtonView props="Send Message" />
                </div>
            </form>
        </div>
    );
}
export default RightContent;
