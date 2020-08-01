import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddHeroModal from './AddHeroModal';

export default function Table() {
	const [heroes, setHeroes] = useState([]);
	const [search, setSearch] = useState('');

	useEffect(() => {
		axios
			.get('https://swapi.dev/api/people/')
			.then((res) => {
				if (res.data.results) {
					res.data.results.forEach((hero) => {
						axios.get(hero.homeworld).then((res) => {
							const { name, birth_year, gender } = hero;
							const planet = res.data.name;
							setHeroes((heroes) => [
								...heroes,
								{ name, birth_year, gender, planet },
							]);
						});
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	function renderTableBody() {
		return heroes.map((hero, index) => {
			const { name, birth_year, gender, planet } = hero;
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
							<input
								type='button'
								id={'deleteBtn' + index}
								hidden
								onClick={() => deleteHero(index)}
							/>
							<label htmlFor={'deleteBtn' + index}>
								<i className='fa fa-trash-o' aria-hidden='true'></i>
							</label>
						</td>
					</tr>
				);
			} else return null;
		});
	}

	function deleteHero(index) {
		setHeroes(heroes.filter((hero) => hero !== heroes[index]));
	}

	return (
		<div>
			<div className='input-group mb-3'>
				<input
					type='text'
					className='form-control'
					onChange={(e) => setSearch(e.target.value)}
					placeholder='Seacrh'
					aria-label='Seacrh'
					aria-describedby='basic-addon2'
				/>
			</div>
			{heroes.length !== 0 && (
				<table className='table'>
					<thead>
						<tr>
							<th scope='col'>Name</th>
							<th scope='col'>Birth Year</th>
							<th scope='col'>Gender</th>
							<th scope='col'>Planet</th>
							<th scope='col'>
								<AddHeroModal heroes={heroes} setHeroes={setHeroes} />
							</th>
						</tr>
					</thead>
					<tbody>{renderTableBody()}</tbody>
				</table>
			)}
		</div>
	);
}
