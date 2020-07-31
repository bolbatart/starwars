import React, { useState, useEffect } from 'react'
import axios from 'axios';
import AddHeroeModal from './AddHeroeModal';

export default function Table() {
    const [heroes, setHeroes] = useState([]);
    const [search, setSearch] = useState('')


    useEffect(() => {
        axios.get('https://swapi.dev/api/people/')
            .then(res => {
                if (res.data.results) {
                    res.data.results.forEach((heroe) => {
                        axios.get(heroe.homeworld)
                            .then(res => {
                                const {name, birth_year, gender} = heroe;
                                const planet = res.data.name;
                                setHeroes(heroes => [
                                    ...heroes,
                                    { name, birth_year, gender, planet }
                                ]);  
                            })
                            .catch(err => {

                            })
                    })
                }
                else throw new Error('There is no response from API');
            })
            .catch(err => {
                console.log(err);
            })
    }, []);


    function renderTableBody() {
        return heroes.map((heroe, index) => {
            const {name, birth_year, gender, planet} = heroe;
            if (
                name.toUpperCase().indexOf(search.toUpperCase()) > -1 ||
                birth_year.toUpperCase().indexOf(search.toUpperCase()) > -1 ||
                gender.toUpperCase().indexOf(search.toUpperCase()) > -1 ||
                planet.toUpperCase().indexOf(search.toUpperCase()) > -1
                ) {
                return (
                    <tr key={index}>
                        <td>{name}</td>
                        <td>{birth_year}</td>
                        <td>{gender}</td>
                        <td>{planet}</td>
                        <td>
                            <input type="button" id={"deleteBtn" + index} hidden onClick={() => deleteHeroe(index)} />
                            <label htmlFor={"deleteBtn" + index}>
                                <i className="fa fa-trash-o" aria-hidden="true"></i>
                            </label>
                        </td>
                    </tr>
                )
            }
        })
    }

    function deleteHeroe(index) {
        setHeroes(heroes.filter(heroe => heroe !== heroes[index]));
    }

    return (
        <div>
            <div className="input-group mb-3">
                <input type="text" className="form-control" onChange={e => setSearch(e.target.value)} placeholder="Seacrh" aria-label="Seacrh" aria-describedby="basic-addon2" />
            </div>
            {
                heroes.length !== 0 &&
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Birth Year</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Planet</th>
                            <th scope="col">
                                <AddHeroeModal heroes={heroes} setHeroes={setHeroes}/>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTableBody()}
                    </tbody>
                </table>
            }
        </div>
    )
}
