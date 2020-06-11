import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import {signin, authenticate} from '../auth';

const Signin = () => {
    const [values, setValues] = useState({
        id: "",
        password: "",
        error: "",
        loading: false,
        redirectToReferrer:false,

    });

    const { id, password, error,loading, redirectToReferrer } = values;

    const handleChange = id => event => {
        setValues({ ...values, error: false, [id]: event.target.value });
    };



    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false,loading:true});
        signin({ id, password }).then(data => {
          console.log("DATA --Z ",data)
            if (!data.success) {
              alert('asasaasa A');
                setValues({ ...values, error: data.msg, loading: false });
            } else {
              authenticate(data, () => {
                  setValues({
                      ...values,
                      redirectToReferrer: true
                  });
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

    const showLoading = () =>
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        );

    const redirectUser = () => {

        if (redirectToReferrer) {
            return <Redirect to="/user/dashboard" />;
        }
    };

    return (
        <Layout
            title="Signup"
            description="Signup to Node React E-commerce App"
            className="container col-md-8 offset-md-2"
        >
        {showLoading()}
        {showError()}
        {signUpForm()}
        {redirectUser()}
        </Layout>
    );
};

export default Signin;
