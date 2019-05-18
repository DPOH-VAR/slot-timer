import React, {Component} from 'react';

const dateUpdateHandlers = new Set();

export default (dateProp='date') => (Cmp) => class InjectDateComponent extends Component {

	constructor(props){
		super(props);
		this.state = {
			date: Date.now(),
		};
	}

	componentDidMount() {
		dateUpdateHandlers.add(this.updateDate);
	}

	updateDate = (date) => {
		this.setState({
			date: date,
		});
	};

	componentWillUnmount() {
		dateUpdateHandlers.delete(this.updateDate);
	}

	render() {
		const props = {...this.props, [dateProp]:this.state.date};
		return (<Cmp {...props}/>);
	}
}

setInterval(() => {
	for (const handler of dateUpdateHandlers) handler(Date.now());
}, 1000);