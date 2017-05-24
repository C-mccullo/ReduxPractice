import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPost } from '../actions/index';
import { deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostsShow extends Component {

	static contextTypes = {
		router: PropTypes.object
	};

	componentWillMount() {
		this.props.fetchPost(this.props.params.id);
		console.log(this.props.params);
	}

	onDeleteClick() {
		this.props.deletePost(this.props.params.id)
		.then(() => { this.context.router.push('/'); }); 
	}

	render() {
		const post = this.props.post;

		if (!this.props.post) {
			return <div>Loading...</div>;
		} 

		return (
			<div>
				<Link className="btn btn-primary pull-xs-right" to="/">Back to Index</Link>
				<h3>{post.title}</h3>
				<h5>Categories {post.categories}</h5>
				<p>{post.content}</p>
				<button 
					className="btn btn-danger"
					onClick={this.onDeleteClick.bind(this)}
					>Delete Post</button>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { post: state.posts.post };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchPost, deletePost }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsShow);