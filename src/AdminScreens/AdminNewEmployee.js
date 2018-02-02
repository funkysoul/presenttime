'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  NativeModules,
} from 'react-native';

import StepIndicator from 'react-native-step-indicator';

import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem, Subtitle, Item, Input, Thumbnail, Label, Form, Switch } from "native-base";
import firebase from 'react-native-firebase';
import AnimatedLinearGradient, {presetColors} from 'react-native-animated-linear-gradient';
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator, ViewPager} from 'rn-viewpager';



let generatedPin = '';

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013'
}

const labels = ["Personelles","Finanzen und Gesundheit","Interne Angaben"];



class AdminDash extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      uid: '',
      userData:{},
      employeeData: {
        key: '',
        pin: '',
        role: 'user',
        salutation: '',
        name: '',
        surname: '',
        street: '',
        zip: '',
        city: '',
        birthday: '',
        mobilenr: '',
        email: '',
        contract_begin: '',
        ahv: '',
        bank: '',
        bank_zip: '',
        bank_city: '',
        iban: '',
        healthInsurance: '',
        healthInsurance_nr: '',
        civil_status: '',
        num_children: '',
        nationality: '',
        ch_permit: '',
        employment_type: '', // fest/stunden
        employment_salary: '', // fest / stunden
        monthly_hours_min: '',
        monthly_hours_max: '',
        location: '',
        duty: '',
        message: '',
        contractSigned: '',


      },
      currentPosition: 0,

    };
  }

  componentWillMount() {
    this.setState({userData: this.props.navigation.state.params.data, uid: this.props.navigation.state.params.uid });
  }

  componentDidMount(){
    this.generatePin();
  }

  generatePin() {
    var min = 0,
        max = 9999;

    var that = this;
    var userColl = [];
    
    this.generatedPin = ("0" + (Math.floor(Math.random() * (max - min + 1)) + min)).substr(-4);

    firebase.analytics().logEvent("generated_pin", {generatedPin});

    that.setState({employeeData:{...that.state.employeeData, pin: that.generatedPin}});

  }

  createNewEmployee(){
    var that = this;

    var newEmployeeID = firebase.database().ref('employees/' + that.state.uid + "/").push().key;
    
    var updates = {};
    updates['employees/' + that.state.uid + "/" + newEmployeeID] = this.state.employeeData;

    return firebase.database().ref().update(updates);
  }

  render() {
    return (
      	<Container>
    			<Content contentContainerStyle={{ flexGrow: 1 }}>
    					<AnimatedLinearGradient customColors={presetColors.sunrise} speed={4000}/>
              <View style={styles.employeeHeader}>
                <TouchableOpacity onPress={() => this.pickSingleWithCamera(false)}>
                  <Image style={{width: 200, height: 200}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/present-f5ca7.appspot.com/o/restaurants%2F-hjki%2Femployees%2F83.jpg?alt=media&token=6ac1a7c1-006e-4d26-a9bb-0559cd7a864d'}} />
                </TouchableOpacity>
                <View>
                  <Text style={styles.pinContainer}>PIN</Text>
                  <Text style={styles.pinContainer}>{this.state.employeeData.pin}</Text>  
                </View>
                
              </View>
              <View style={styles.formcontainer}>
                <StepIndicator
                     customStyles={customStyles}
                     currentPosition={this.state.currentPosition}
                     labels={labels}
                     stepCount = {3}
                />

                <ViewPager style={{flex: 1}} onPageSelected={(position) => { this.setState({currentPosition: position.position }) }} >
                    <View>
                       <Form style={styles.form}>
                       <Item floatingLabel style={styles.formFieldThird}>
                          <Label>Anrede</Label>
                          <Input onChangeText={ ( str ) => this.setState( { employeeData:{ ...this.state.employeeData, name: str } } ) } />
                        </Item>
                        <Item floatingLabel style={styles.formFieldThird}>
                          <Label>Name</Label>
                          <Input onChangeText={ ( str ) => this.setState( { employeeData:{ ...this.state.employeeData, name: str } } ) } />
                        </Item>
                        <Item floatingLabel style={styles.formFieldThird}>
                          <Label>Vorname</Label>
                          <Input />
                        </Item>
                        <Item floatingLabel style={styles.formFieldFull}>
                          <Label>Strasse & Hausnummer</Label>
                          <Input />
                        </Item>
                        <Item floatingLabel style={styles.formFieldHalf}>
                          <Label>PLZ</Label>
                          <Input />
                        </Item>
                        <Item floatingLabel style={styles.formFieldHalf}>
                          <Label>Ortschaft</Label>
                          <Input />
                        </Item>
                        <Item floatingLabel style={styles.formFieldHalf}>
                          <Label>Mobile</Label>
                          <Input />
                        </Item>
                        <Item floatingLabel style={styles.formFieldHalf}>
                          <Label>Geburtsdatum</Label>
                          <Input />
                        </Item>
                        <Item floatingLabel style={styles.formFieldHalf}>
                          <Label>Festnetz</Label>
                          <Input />
                        </Item>
                        <Item floatingLabel style={styles.formFieldHalf}>
                          <Label>E-Mail</Label>
                          <Input />
                        </Item>

                        <Item floatingLabel style={styles.formFieldHalf}>
                          <Label>Zivilstand</Label>
                          <Input />
                        </Item>

                        <Item floatingLabel style={styles.formFieldHalf}>
                          <Label>Anzahl Kinder</Label>
                          <Input />
                        </Item>

                        <Item floatingLabel style={styles.formFieldHalf}>
                          <Label>Aufenthaltsbewilligung</Label>
                          <Input />
                        </Item>

                        <Item floatingLabel style={styles.formFieldHalf}>
                          <Label>Nationalität</Label>
                          <Input />
                        </Item>
                        
                      </Form>
                    </View>
                    <View>
                        <Form style={styles.form}>

                          <Text style={styles.formFieldFull}>Bank Angaben</Text>

                          <Item floatingLabel style={styles.formFieldHalf}>
                            <Label>IBAN</Label>
                            <Input />
                          </Item>
                          <Item floatingLabel style={styles.formFieldHalf}>
                            <Label>Finanzinstitut</Label>
                            <Input />
                          </Item>
                          <Item floatingLabel style={styles.formFieldHalf}>
                            <Label>PLZ</Label>
                            <Input />
                          </Item>
                          <Item floatingLabel style={styles.formFieldHalf}>
                            <Label>Ortschaft</Label>
                            <Input />
                          </Item>


                          <Text style={styles.formFieldFull}>Krankenkasse</Text>

                          <Item floatingLabel style={styles.formFieldHalf}>
                            <Label>Krankenkasse</Label>
                            <Input />
                          </Item>

                          <Item floatingLabel style={styles.formFieldHalf}>
                            <Label>Versicherten Nr.</Label>
                            <Input />
                          </Item>

                          <Item floatingLabel style={styles.formFieldHalf}>
                            <Label>AHV</Label>
                            <Input />
                          </Item>

                          
                          

                        </Form>
                    </View>
                    <View>
                        <Form style={styles.form}>
                          <Item floatingLabel style={styles.formFieldThird}>
                            <Label>Vertragsbeginn</Label>
                            <Input />
                          </Item>
                          <Item floatingLabel style={styles.formFieldThird}>
                            <Label>Anstellungstyp</Label>
                            <Input />
                          </Item>
                          <Item floatingLabel style={styles.formFieldThird}>
                            <Label>Lohn</Label>
                            <Input />
                          </Item>
                          <Item floatingLabel style={styles.formFieldHalf}>
                            <Label>Min. Stunden Monat</Label>
                            <Input />
                          </Item>
                          <Item floatingLabel style={styles.formFieldHalf}>
                            <Label>Max. Stunden Monat</Label>
                            <Input />
                          </Item>
                          <Item floatingLabel style={styles.formFieldHalf}>
                            <Label>Standort</Label>
                            <Input />
                          </Item>
                          <Item floatingLabel style={styles.formFieldHalf}>
                            <Label>Aufgabenbereich</Label>
                            <Input />
                          </Item>

                          <View style={styles.switch}>
                            <Switch value={false} />
                            <Label style={styles.switchLabel}>Vertrag unterzeichnet?</Label>
                          </View>
                        </Form>
                        <Button rounded success onPress={()=>this.createNewEmployee()} style={{width: "40%", marginTop: 60, marginLeft: "auto", marginRight: "auto"}}>
                            <Text style={{ marginLeft: 'auto', marginRight: 'auto'}}>Mitarbeiter anlegen</Text>
                          </Button>
                    </View>

                </ViewPager>
    				</View>
    			</Content>
    		</Container>
    );
  }
}



const styles = StyleSheet.create({
  employeeHeader: {
    flex: 0.1,
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  formcontainer: {
    flex: 0.9,
    paddingTop: 40,
  },
  formFieldThird: {
    width: '30%',
  },
  formFieldHalf: {
    width: '46%',
  },
  formFieldFull: {
    width: '94%',
  },
  form: {
    flexDirection: 'row', 
    marginTop: 40, 
    marginBottom: 20, 
    justifyContent: 'flex-start', 
    flexWrap: 'wrap',
    paddingLeft: 60,
    paddingRight: 60
  },
  switch: {
    marginTop: 40,
    paddingLeft: 10,
    flexDirection: 'row'
  },
  switchLabel: {
    marginLeft: 20,
  },
  pinContainer: {
    color: "white",
    fontSize: 40,
    marginLeft: 20,
    
  }

});


export default AdminDash;