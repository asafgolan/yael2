import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import {signup} from '../auth';

const Signup = () => {
    const [values, setValues] = useState({
        id: "",
        password: "",
        error: "",
        success: false
    });

    const { id, password, success, error } = values;

    const handleChange = id => event => {
        setValues({ ...values, error: false, [id]: event.target.value });
    };



    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ id, password }).then(data => {
          console.log("DATA --Z ",data)
            if (!data.success) {
              alert('asasaasa A');
                setValues({ ...values, error: data.msg, success: false });
            } else {
              alert('asasaasa B ');
                setValues({
                    ...values,
                    id: "",
                    password: "",
                    error: "",
                    success: true
                });
            }
        });
    };

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    onChange={handleChange("id")}
                    type="text"
                    className="form-control"
                    value={id}

                />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    onChange={handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}

                />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showSuccess = () => {
        console.log("calling show success")
        return (
            <div
                className="alert alert-info"
                style={{ display: success ? "" : "none" }}
            >
                New account is created. Please <Link to="/signin">Signin</Link>
            </div>
        );
    }
    return (
        <Layout
            title="Signup"
            description="Signup to Node React E-commerce App"
            className="container col-md-8 offset-md-2"
        >
            {showSuccess()}
            {showError()}
            {signUpForm()}
            {JSON.stringify(values)}
        </Layout>
    );
};

export default Signup;
