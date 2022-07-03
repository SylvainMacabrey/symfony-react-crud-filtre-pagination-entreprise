import React, { useState, useEffect } from 'react';
import { getDepartments } from '../api';

const FormEmployee = ({ typeAction, employee, handleChangeEmployee }) => {

    const [ departments, setDepartments ] = useState([]);
    const [ department, setDepartment ] = useState(employee.department.id);
    const [ firstname, setFirstname ] = useState(employee.firstname);
    const [ lastname, setLastname ] = useState(employee.lastname);
    const [ age, setAge ] = useState(employee.age);
    const [ email, setEmail ] = useState(employee.email);

    const handleChangeDepartment = (value) => {
        setDepartment(value);
    } 

    const handleChangeFirstname = (value) => {
        setFirstname(value);
    } 

    const handleChangeLastname = (value) => {
        setLastname(value);
    }
    
    const handleChangeAge = (value) => {
        setAge(value);
    }

    const handleChangeEmail = (value) => {
        setEmail(value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = {
            firstname,
            lastname,
            age,
            email,
            department: {
                id: department
            }
        };
        if(employee.id !== undefined) {
            data.id = employee.id;
        }
        handleChangeEmployee(data);
        
    }

    useEffect(() => {
        getDepartments().then(res => {
            setDepartments(res);
        });
    }, []);

    return (
        <div>
            <form onSubmit={ (e) => handleSubmit(e) }>
                <div className="row">
                    <div className="col mb-3">
                        <input type="text" className="form-control" placeholder="Prénom" aria-label="Prénom" value={ firstname } onChange={ (e) => handleChangeFirstname(e.target.value) } />
                    </div>
                    <div className="col mb-3">
                        <input type="text" className="form-control" placeholder="Nom" aria-label="Nom" value={ lastname } onChange={ (e) => handleChangeLastname(e.target.value) } />
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3">
                        <input type="number" className="form-control" placeholder="Age" aria-label="Age" value={ age } onChange={ (e) => handleChangeAge(e.target.value) } />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Email" aria-label="Email" value={ email } onChange={ (e) => handleChangeEmail(e.target.value) } />
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3">
                        <select className="form-select" aria-label="Default select example" value={ department } onChange={ (e) => handleChangeDepartment(e.target.value) }>
                            <option value="" >Tous les départements</option>
                            { departments.map(department => (
                                <option key={ department.id } value={ department.id } >{ department.name }</option>
                            ))}
                        </select>
                    </div>
                    <div className="col mb-3">
                        <button className="btn btn-primary">{ typeAction }</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FormEmployee;