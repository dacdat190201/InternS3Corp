import React from "react";
import "./Error.css";
function Error() {
  return (
    <div>
      <hr></hr>
      <div className="main__contact">
        <div className="contact__top">
          Home/<p> 404 Error</p>
        </div>
        <div className="error__404">
          <div className="error__container">
            <h1>404 Not Found</h1>
            <p>Your visited page not found. You may go home page.</p>
          </div>
          <div className="error-btn">
            <button>Back to home page</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Error;
