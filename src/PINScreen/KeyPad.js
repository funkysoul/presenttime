import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    pad: {
        flex: 1,
        margin: 30,
    },
    btn: {
        fontSize: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 35,
        textAlign: 'center',
        margin: 10,
        
        borderWidth:1,
        borderColor: 'black'
    },
    header: {
        fontSize: 30,
        fontWeight: '500',
        textAlign: 'center',
    },
    pin: {
        fontSize: 40,
        fontWeight: '500',
    },

});

const MAX_LENGTH = 4;

function makeDots(num) {
    let ret = '';
    while (num > 0) {
        ret += ' ○ ';
        num--;
    }
    return ret;
}

export default class KeyPad extends Component {
    constructor(props) {
      super(props);
    
      this.state = {value: '', result: 'enter code'};
    }

    errorHint(newProps){
        
        
        setTimeout(()=>{ 
            this.setState({value: '', result: 'enter code'});   
        }, 1500);
    }

    componentWillUnmount(){

    }

    handleClear() {
        this.setState({value: ''});
    }

    handlePress(num) {
        let {value} = this.state;
        value += String(num);

        this.setState({value});

        if (value.length == MAX_LENGTH) {
            this.props.onSubmit(value);
        }
    }

    handleRemove() {
        const {value} = this.state;
        this.setState({value: value.substr(0, value.length - 1)});
    }

    renderButton(num) {
        return (
            <TouchableOpacity onPress={()=> this.handlePress(num)}>
                <Text style={styles.btn}>{num}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        const {value} = this.state;
        const {result} = this.state;
        const marks = value.replace(/./g, ' ● ');
        const dots = makeDots(MAX_LENGTH - value.length);
        
        return (<View style={styles.pad} >
            <Text style={styles.header} >
                {result}
            </Text>

            <View style={styles.row} >
                <Text style={styles.pin} >{marks}{dots}</Text>
            </View>

            <View style={styles.row} >
                {this.renderButton(1)}
                {this.renderButton(2)}
                {this.renderButton(3)}
            </View>

            <View style={styles.row} >
                {this.renderButton(4)}
                {this.renderButton(5)}
                {this.renderButton(6)}
            </View>

            <View style={styles.row} >
                {this.renderButton(7)}
                {this.renderButton(8)}
                {this.renderButton(9)}
            </View>

            <View style={styles.row} >
                <Text onPress={()=> this.handleClear()} style={styles.btn}>C</Text>
                {this.renderButton(0)}
                <Text onPress={()=> this.handleRemove()} style={styles.btn}>{'<'}</Text>
            </View>
        </View>);
    }
}