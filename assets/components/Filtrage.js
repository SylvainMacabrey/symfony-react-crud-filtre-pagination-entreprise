import React, { useState, useEffect }  from 'react';
import { getDepartments } from '../api';


const Filtrage = ({ name, handleChangeName, department, handleChangeDepartment }) => {

    const [ departments, setDepartments ] = useState([]);

    useEffect(() => {
        getDepartments().then(res => {
            setDepartments(res);
        });
    }, []);

    let selected = (department === department.id);

    return (
        <div className="row">
            <div className="col-6">
                <select className="form-select" aria-label="Default select example" value={ department } onChange={ (e) => handleChangeDepartment(e.target.value) }>
                    <option value="" >Tous les départements</option>
                    { departments.map(department => (
                        <option key={ department.id } value={ department.id } >{ department.name }</option>
                    ))}
                </select>
            </div>
            <div className="col-6">
                <div className="mb-3">
                    <input type="text" value={ name } onChange={ (e) => handleChangeName(e.target.value) } className="form-control" id="recherche" placeholder="Recherche par nom ou prénom" />
                </div>
            </div>
        </div>
    )
}

export default Filtrage;