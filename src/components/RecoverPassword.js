import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";


const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  const validEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email.
        </div>
      );
    }
  };


function RecoverPassword() {
    const [email, setEmail] = useState("");
    const [successful, setSuccessful] = useState(false);
    const form = useRef();
    const checkBtn = useRef();
  
    const [message, setMessage] = useState("");
   
    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
      };
      


    const handleRecoverPassword = async (e) => {
        e.preventDefault();
    
        setMessage("");
        setSuccessful(false);
    
        form.current.validateAll();
    
        if (checkBtn.current.context._errors.length === 0) {
          try {
            await AuthService.forgotpassword(email);
            setMessage("Email sent successfully. Please check your email.");
            setSuccessful(true);
          } catch (error) {
            const message =
              (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
    
            setMessage(message);
            setSuccessful(false);
          }
        }
      };
    
  return (
<Form onSubmit={handleRecoverPassword} ref={form}>
          {!successful && (
            <div>
          

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

            

              <div className="form-group">
                <button className="btn btn-primary btn-block">send email</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={ successful ? "alert alert-success" : "alert alert-danger" }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>  )
}

export default RecoverPassword