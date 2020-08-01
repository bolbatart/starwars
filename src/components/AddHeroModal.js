import React, { useState } from 'react';

export default function AddHeroModal({ setHeroes, heroes }) {
	const [newHero, setNewHero] = useState({
		name: '',
		birh_year: '',
		gender: '',
		planet: '',
	});

	function handleChange(e) {
		const { name, value } = e.target;
		setNewHero({ ...newHero, [name]: value });
	}

	function addHero() {
		setHeroes([...heroes, newHero]);
	}

	return (
		<div>
			<button
				type='button'
				className='btn btn-primary btn-sm'
				data-toggle='modal'
				data-target='#exampleModal'
			>
				<i className='fa fa-plus' aria-hidden='true'></i>
			</button>

			<div
				className='modal fade'
				id='exampleModal'
				tabIndex='-1'
				role='dialog'
				aria-labelledby='exampleModalLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<form>
							<div className='modal-header'>
								<h5 className='modal-title' id='exampleModalLabel'>
									Add hero
								</h5>
								<button
									type='button'
									className='close'
									data-dismiss='modal'
									aria-label='Close'
								>
									<span aria-hidden='true'>&times;</span>
								</button>
							</div>
							<div className='modal-body'>
								<div className='container'>
									<div className='form-group'>
										<label htmlFor='heroName'>Full Name</label>
										<input
											type='text'
											className='form-control'
											id='heroName'
											aria-describedby='emailHelp'
											name='name'
											onChange={handleChange}
										/>
									</div>
									<div className='form-group'>
										<label htmlFor='heroBirthYear'>Birth Year</label>
										<input
											type='text'
											className='form-control'
											id='heroBirthYear'
											name='birth_year'
											onChange={handleChange}
										/>
									</div>
									<div className='form-group'>
										<label htmlFor='heroGender'>Gender</label>
										<input
											type='text'
											className='form-control'
											id='heroGender'
											name='gender'
											onChange={handleChange}
										/>
									</div>
									<div className='form-group'>
										<label htmlFor='heroPlanet'>Planet</label>
										<input
											type='text'
											className='form-control'
											id='heroPlanet'
											name='planet'
											onChange={handleChange}
										/>
									</div>
								</div>
							</div>
							<div className='modal-footer'>
								<button
									type='button'
									className='btn btn-primary'
									data-dismiss='modal'
									onClick={addHero}
								>
									Add
								</button>
								<button
									type='button'
									className='btn btn-secondary'
									data-dismiss='modal'
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
