import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form'; // redux form has the same behaviour as Redux Connect
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
	// NOTE: do not use context when developing applications, React may change structure later which will effect your application!
	static contextTypes = {
		router: PropTypes.object
	};

	onSubmit(props) {
		this.props.createPost(props)
		.then(() => {
			this.context.router.push('/');
		});
	};

	render() {
		const { handleSubmit } = this.props; // equivalent const handleSubmit = this.props.handleSubmit
		const title = this.props.fields.title;
		const categories = this.props.fields.categories;
		const content = this.props.fields.content;

		return (
			<div>
				<form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
					<h3>Create a New Post</h3>
					<div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
						<label>Title</label>
						<input type="text" className="form-control" {...title} />
						<div className="text-help"> { title.touched ? title.error : null } </div>
					</div>
					<div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
						<label>Categories</label>
						<input type="text" className="form-control" {...categories} />
						<div className="text-help"> { categories.touched ? categories.error : null } </div>
					</div>
					<div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
						<label>Content</label>
						<textarea className="form-control" {...content} />
						<div className="text-help"> { content.touched ? content.error : null } </div>
					</div>
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
					<Link to="/" className="btn btn-danger"> Cancel </Link>
				</form>
			</div>
		)
	}
}

function validate(values) {
	const errors = {};

	if (!values.title) {
		errors.title = 'please enter a username';
	}

	if (!values.categories) {
		errors.categories = 'please enter a category'
	}

	if (!values.content) {
		errors.content = 'please enter some content';
	}
	return errors;
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ createPost }, dispatch);
}

// connect: 1st arg = mapStateToProps, 2nd = mapDispatchToProps
// reduxForm: 1st arg = form config, 2nd = mapsStateToProps, 3rd = mapDispatchToProps 
// difference between reduxForm and Connect is the configuration object in reduxForm
export default reduxForm({
	form: 'PostsNewForm',
	fields: ['title', 'categories', 'content'],
	validate
}, null, mapDispatchToProps)(PostsNew);

