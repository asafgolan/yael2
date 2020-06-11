import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createTodo } from "./api";

const AddTodo = ({updateTodos}) => {
    const [values, setValues] = useState({
        loading: false,
        error: "",
        date:"",
        description:"",
        formData: ""
    });

    const { id, token } = isAuthenticated();
    const {
        description,
        date,
        error,
        formData
    } = values;

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
    }, []);

    const handleChange = name => event => {
        const value = event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });
        console.log('id', id);
        createTodo(id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    description: "",
                    date:"",
                    loading: false
                });
                updateTodos(id, token)
            }
        });
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea
                    onChange={handleChange("description")}
                    className="form-control"
                    value={description}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Date</label>
                <input
                    onChange={handleChange("date")}
                    type="datetime-local"
                    className="form-control"
                    value={date}
                />
            </div>
            <button className="btn btn-outline-primary">Create todo</button>
        </form>
    );

    return (
        <div className="col-md-8 offset-md-2">{newPostForm()}</div>
    );
};

export default AddTodo;
