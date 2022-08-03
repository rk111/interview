import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Get } from '../../../utils/axiosUtils';

export const EmployeeList = () => {
    const [empData, setEmpData] = useState();

    const getAllEmployee = async () => {
        return await Get('/employee');
    }

    useEffect(() => {
        getAllEmployee().then((res) => {
            setEmpData(res.data);
        });
    }, [])

    return (
        <div className="row mt-2">
            <div className="col-md-12 text-right mb-2">
                <Link className="btn btn-primary" to="/add-edit">
                    Add Employee
                </Link>
            </div>
            <div className="col-md-12">
                <table className="table  table-striped table-bordered">
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Designation</th>
                        <th>DOB</th>
                        <th>Experiance</th>
                        <th>Pic</th>
                        <th>Actions</th>
                    </tr>
                    {
                        empData && empData.map((item, index) => {
                            return (
                                <tr>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>{item.designation}</td>
                                    <td>{item.dob}</td>
                                    <td>{item.experiance}</td>
                                    <td>{item.avatar}</td>
                                    <td>
                                        <Link to={`/add-edit/${item.id}`}>Edit</Link>
                                        {' '}
                                        <a>Delete</a>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
        </div >
    )
}