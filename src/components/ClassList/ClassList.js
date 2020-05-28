import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class ClassList extends Component {
	constructor() {
		super()
		this.state = {
			students: []
		}
	}

	componentDidMount() {
		const { params } = this.props.match

		axios
			.get(`http://localhost:3005/students?class=${params.class}`)
			.then(res => {
				console.log(res)
				this.setState({ students: res.data })
			})
			.catch(err => console.log(err))
	}

	render() {
		const { params } = this.props.match,
			{ students } = this.state
		return (
			<div className='box'>
				<h1>{params.class}</h1>
				<h2>ClassList:</h2>
				{students.map(student => (
					<Link to={`/student/${student.id}`} key={student.id}>
						<h3>{`${student.first_name} ${student.last_name}`}</h3>
					</Link>
				))}
				<button onClick={this.props.history.goBack}>Back</button>
			</div>
		)
	}
}
