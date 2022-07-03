import React, { useState, useEffect } from 'react';
import { getEmployees, postEmployee, putEmployee } from '../api';
import Filtrage from './Filtrage';
import Pagination from './Pagination';
import FormEmployee from './FormEmployee';

const List = () => {

    const [ employees, setEmployees ] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ totalPage, setTotalPage ] = useState(0);
    const [ nbResult, setNbResult ] = useState(0);
    const [ name, setName ] = useState('');
    const [ department, setDepartment ] = useState('');
    const [ employeeForm, setEmployeeForm ] = useState({});
    const [ formVisible, setFormVisible ] = useState(false);
    const [ typeAction, setTypeAction ] = useState('');

    const handleChangePage = (e) => {
        setCurrentPage(e);
    };

    const handleChangeName = (value) => {
        setCurrentPage(1);
        setName(value);
    }

    const handleChangeDepartment = (value) => {
        setCurrentPage(1);
        setDepartment(value);
    }

    const handleForm = (value, action = '', employee = '') => {
        setFormVisible(value);
        setTypeAction(action);
        if(action == 'Ajouter') {
            setEmployeeForm({
                firstname: '',
                lastname: '',
                age: '',
                email: '',
                department: {
                    id: ""
                },
            });
        } else {
            setEmployeeForm(employee);
        }
    }

    const handleChangeEmployee = (value) => {
        if(value.id !== undefined) {
            putEmployee(value).then(res => {
                console.log(res);
            });
        } else {
            postEmployee(value).then(res => {
                console.log(res);
            });
        }
        setFormVisible(false);
        getEmployees(currentPage, name, department).then(res => {
            setEmployees(res.items);
            setTotalPage(res.pagination.total_pages);
            setNbResult(res.pagination.total_items);
        });
    }

    useEffect(() => {
        getEmployees(currentPage, name, department).then(res => {
            setEmployees(res.items);
            setTotalPage(res.pagination.total_pages);
            setNbResult(res.pagination.total_items);
        });
    }, [currentPage, name, department]);

    return (
        <div className="container" style={{ marginTop: 20 }}>

            <div className="row row-cadre">
                <div className="titre mb-3">
                    <h3 style={{ float: 'left' }}>Liste des employés</h3>
                    { !formVisible && <button className="btn btn-primary btn-right" onClick={ () => handleForm(true, 'Ajouter') }>Ajouter</button>}
                    { formVisible && <button className="btn btn-secondary btn-right" onClick={ () => handleForm(false) }>Annuler</button>}
                </div>
                { formVisible && <FormEmployee typeAction={ typeAction } employee={ employeeForm } handleChangeEmployee={ handleChangeEmployee }  />}
            </div>

            <div className="row row-cadre">
                <Filtrage name={ name } handleChangeName={ handleChangeName } department={ department } handleChangeDepartment={ handleChangeDepartment } />
                <table className="table">
                    <thead className="table-dark">
                        <tr>
                            <th scope='col'>Prénom et Nom</th>
                            <th scope='col'>Age</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Département</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        { employees.map(employee => (
                            <tr key={ employee.id }>
                                <td>{ employee.firstname } { employee.lastname }</td>
                                <td>{ employee.age }</td>
                                <td>{ employee.email }</td>
                                <td>{ employee.department.name }</td>
                                <td>
                                    <button className="btn btn-primary btn-warning" onClick={ () => handleForm(true, 'Modifier', employee) }>Modifier</button>
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </table>
                { totalPage > 1 && 
                    <div className="d-flex justify-content-center">
                        <Pagination totalPage={ totalPage } handleChangePage={ handleChangePage } currentPage={ currentPage } />
                    </div>
                }
            </div>

        </div>
    )
}

export default List;