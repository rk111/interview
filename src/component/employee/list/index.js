/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Get, Delete } from '../../../utils/axiosUtils';

export const EmployeeList = () => {
    const [empData, setEmpData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const getAllEmployee = async () => {
        setIsLoading(true);
        return await Get('/employee');
    }


    const deleteEmployee = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete');
        if (confirmDelete) {
            const res = await Delete(`/employee/${id}`);
            if (res.data) {
                getAllEmployee().then((res) => {
                    setEmpData(res.data);
                    setIsLoading(false);
                });
            }

        }

    }


    useEffect(() => {
        getAllEmployee().then((res) => {
            setEmpData(res.data);
            setIsLoading(false);
        });
    }, [])

    return (
        <div className="row mt-2">
            <div className="col-md-12 text-md-end mb-2">
                <Link className="btn btn-primary btn-sm" to="/add-edit">
                    Add Employee
                </Link>
            </div>
            <div className="col-md-12">
                <table className="table  table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>S.N.</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Designation</th>
                            <th>DOB</th>
                            <th>Experiance</th>
                            <th>Pic</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ?
                            <tr>
                                <td colSpan="8" className="text-center">Loading...</td>
                            </tr> :
                            empData && empData.map((item, index) => {
                                return (
                                    <tr key={`key_${item.id}`}>
                                        <td>{item.id}</td>
                                        <td>{item.first_name}</td>
                                        <td>{item.last_name}</td>
                                        <td>{item.designation}</td>
                                        <td>{new Date(item.dob).toString('MM/dd/yy HH:mm:ss')}</td>
                                        <td>{item.experiance}</td>
                                        <td><img src={item.avatar} alt={item.avatar} className="border border-1 avatar rounded-circle" /></td>
                                        <td className="text-center">
                                            <Link className="badge text-bg-primary" to={`/add-edit/${item.id}`}>Edit</Link>
                                            {' '}
                                            <button className="pe-2 badge text-bg-danger" onClick={() => deleteEmployee(item.id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div >
    )
}