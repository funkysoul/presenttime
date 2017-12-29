export function setSpecificStateChild(refe, str, obj) {
	refe.setState({...refe.state, [str]: {...refe.state.str, obj }});
}
