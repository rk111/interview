/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Field, Formik, Form, ErrorMessage } from "formik"

import { Post, Get, Put } from "../../../utils/axiosUtils";

export const AddEditEmployee = ({ history, match }) => {
    const { id } = match.params;
    const isAddMode = !id;

    const [initVals, setInitVals] = useState({
        first_name: "",
        avatar: "",
        last_name: "",
        designation: "",
        experiance: "",
    })

    const onSubmit = (field, { setSubmitting }) => {
        if (isAddMode) {
            addEmployee(field, setSubmitting);
        }
        else {
            editEmployee(field, setSubmitting);
        }

    }


    const addEmployee = (fields, setSubmitting) => {
        const postData = {
            ...fields
        }

        Post("/employee", postData).than((res) => {
            console.log(res);
            // setSubmitting(false)
        })
    }

    const editEmployee = (fields, setSubmitting) => {
        const postData = {
            ...fields
        }

        Put(`/employee/${id}`, postData).than((res) => {
            console.log(res);
            // setSubmitting(false)
        })
    }
    const getEmployeeyById = async () => {
        const res = await Get(`/employee/${id}`);
        console.log(res.data);
        if (res.data) {
            setInitVals((prev) => {
                return {
                    ...initVals,
                    ...res.data
                }
            })
        }
    }
    // return data;


    useEffect(() => {
        if (!isAddMode) {
            getEmployeeyById();

        }
    }, [])


    return (
        <div className="mt-5 container justify-content-center">
            <div className="row">
                <div className="col-md-12">
                    <h3> {isAddMode ? "Add Employee" : "Edit Employee"}</h3>
                </div>
            </div>
            <Formik
                enableReinitialize={true}
                initialValues={initVals}
                validationSchema={false}
                onSubmit={onSubmit}
            >
                {({
                    errors,
                    touched,
                    isSubmitting,
                    setFieldValue
                }) => {
                    return (
                        <Form>
                            <>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>First Name</label>
                                        <Field name="first_name" type="text" className={'form-control' + (errors.first_name && touched.first_name ? ' is-invalid' : '')} />
                                        <ErrorMessage name="first_name" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Last Name</label>
                                        <Field name="last_name" type="text" className={'form-control' + (errors.last_name && touched.last_name ? ' is-invalid' : '')} />
                                        <ErrorMessage name="last_name" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>designation</label>
                                        <Field name="designation" type="text" className={'form-control' + (errors.designation && touched.designation ? ' is-invalid' : '')} />
                                        <ErrorMessage name="designation" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>experiance</label>
                                        <Field name="experiance" type="text" className={'form-control' + (errors.experiance && touched.experiance ? ' is-invalid' : '')} />
                                        <ErrorMessage name="experiance" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                                <div className="form-group mt-2">
                                    <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                        {/* {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>} */}
                                        Save
                                    </button>
                                    <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
                                </div>
                            </>
                        </Form>
                    )
                }}

            </Formik>
        </div>
    )
}