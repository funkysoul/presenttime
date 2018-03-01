'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  NativeModules,
  Platform
} from 'react-native';

import StepIndicator from 'react-native-step-indicator';
import DatePicker from 'react-native-datepicker'

import ImagePicker from 'react-native-image-crop-picker';

import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem, Subtitle, Item, Input, Thumbnail, Label, Form, Switch, Picker } from "native-base";
import firebase from 'react-native-firebase';
import AnimatedLinearGradient, {presetColors} from 'react-native-animated-linear-gradient';
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator, ViewPager} from 'rn-viewpager';



let generatedPin = '';
let isEditing = '';
let employeeID = '';

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
      isEditing: "false",
      employeeData: {
        key: '',
        pin: '0000',
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
        picture: '',
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
    if(this.props.navigation.state.params.editing == false){
      this.generatePin();
      this.isEditing = false;
      this.setState({employeeData: this.props.navigation.state.params.employeeData, uid: this.props.navigation.state.params.uid });
    } else {
      this.isEditing = true;
      this.setState({employeeData: this.props.navigation.state.params.employeeData, uid: this.props.navigation.state.params.uid });
    }
    
    console.log("CWM - IS EDITING: " + this.isEditing);


  }

  componentWillReceiveProps(nextProps) {
    this.setState({currentPosition: 0 });
    this.pager.setPage(0);

    console.log(nextProps.navigation.state.params.editing);

    if(nextProps.navigation.state.params.editing == false){
      this.isEditing = false;

      for (var key in this.state.employeeData) {
          if (this.state.employeeData.hasOwnProperty(key)) {
              this.state.employeeData[key] = '';
          }
      }

      this.generatePin();
    } else {
      this.isEditing = true;
      this.setState({employeeData: nextProps.navigation.state.params.employeeData, uid: this.props.navigation.state.params.uid });
    }
    console.log("CWRP - IS EDITING: " + this.isEditing); 
  }

  generatePin() {
    var min = 0,
        max = 9999;

    var that = this;
    var userColl = [];
    
    this.generatedPin = ("0" + (Math.floor(Math.random() * (max - min + 1)) + min)).substr(-4);

    firebase.analytics().logEvent("generated_pin", {generatedPin});

    that.setState({employeeData:{...that.state.employeeData, pin: this.generatedPin}});

  }

  createNewEmployee(){
    var that = this;

    if(this.isEditing == true){
      this.employeeID = this.state.employeeData.key;
    } else {
      this.employeeID = firebase.database().ref('employees/' + that.state.uid + "/").push().key;
    }
    
    that.setState({employeeData:{...that.state.employeeData, key: this.employeeID}});

    var updates = {};
    updates['employees/' + that.state.uid + "/" + this.employeeID] = this.state.employeeData;

    this.props.navigation.navigate("AdminDash", {refreshScene:true});

    return firebase.database().ref().update(updates);
  }

  onSalutationChange(value: string) {
    this.setState({employeeData:{...this.state.employeeData, salutation: value}});
  }

  onMaritalStatusChange(value: string) {
    this.setState({employeeData:{...this.state.employeeData, civil_status: value}});
  }

  onPermitChange(value: string) {
    this.setState({employeeData:{...this.state.employeeData, ch_permit: value}});
  }

  pickSingleWithCamera() {
    var that = this;

    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
      firebase.storage()
        .ref().child('images/' + that.state.uid + '/employees/' + that.employeeID + ".jpg")
        .putFile(image.sourceURL)
        .then(uploadedFile => {
          console.log('Uploaded to firebase:', uploadedFile)
          this.setState( { employeeData:{ ...this.state.employeeData, picture: uploadedFile.downloadURL } } );
        })
        .catch(err => {
          console.log('Firebase putFile error:', err)
        })
    });
  }

  render() {
    const employee_picture = this.state.employeeData.picture;

    return (
        <Container>
          <Content contentContainerStyle={{ flexGrow: 1 }}>
              <AnimatedLinearGradient customColors={presetColors.sunrise} speed={4000}/>
              <View style={styles.employeeHeader}>
                <TouchableOpacity onPress={() => this.pickSingleWithCamera(false)}>
                  <Image style={{width: 200, height: 200}} source={{uri: employee_picture}} />
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

                <ViewPager ref={ref => this.pager = ref} style={{flex: 1}} onPageSelected={(position) => { this.setState({currentPosition: position.position }) }} >
                    <View>
                       <Form style={styles.form}>
                       <Item style={styles.formFieldThirdPicker}>
                          <Label>Anrede</Label>
                          <Picker
                            iosHeader="Select one"
                            style={styles.salutationPicker}
                            itemTextStyle={styles.salutationPickerText}
                            itemStyle={styles.salutationPickerText}
                            mode="dropdown"
                            selectedValue={this.state.employeeData.salutation}
                            onValueChange={this.onSalutationChange.bind(this)}>
                            <Item label="Herr" value="herr" />
                            <Item label="Frau" value="frau" />
                          </Picker>
                          
                        </Item>
                        <Item floatingLabel style={styles.formFieldThird}>
                          <Label>Name</Label>
                          <Input value={this.state.employeeData.surname} onChangeText={ ( str ) => this.setState( { employeeData:{ ...this.state.employeeData, surname: str } } ) } />
                        </Item>
                        <Item floatingLabel style={styles.formFieldThird}>
                          <Label>Vorname</Label>
                          <Input value={this.state.employeeData.name} onChangeText={ ( str ) => this.setState( { employeeData:{ ...this.state.employeeData, name: str } } ) } />
                        </Item>
                        <Item floatingLabel style={styles.formFieldFull}>
                          <Label>Strasse & Hausnummer</Label>
                          <Input value={this.state.employeeData.street}  onChangeText={ ( str ) => this.setState( { employeeData:{ ...this.state.employeeData, street: str } } ) } />
                        </Item>
                        <Item floatingLabel style={styles.formFieldHalf}>
                          <Label>PLZ</Label>
                          <Input value={this.state.employeeData.zip}  onChangeText={ ( str ) => this.setState( { employeeData:{ ...this.state.employeeData, zip: str } } ) } />
                        </Item>
                        <Item floatingLabel style={styles.formFieldHalf}>
                          <Label>Ortschaft</Label>
                          <Input value={this.state.employeeData.city}  onChangeText={ ( str ) => this.setState( { employeeData:{ ...this.state.employeeData, city: str } } ) } />
                        </Item>
                        <Item floatingLabel style={styles.formFieldHalf}>
                          <Label>Mobile</Label>
                          <Input value={this.state.employeeData.mobilenr}  onChangeText={ ( str ) => this.setState( { employeeData:{ ...this.state.employeeData, mobilenr: str } } ) } />
                        </Item>
                        <Item style={styles.formFieldHalfPicker}>
                          <Label>Geburtsdatum</Label>
                          <DatePicker
                            
                            date={this.state.employeeData.birthday}
                            mode="date"
                            placeholder="select date"
                            format="DD-MM-YYYY"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={false}
                            customStyles={{
                              dateInput: {
                                marginLeft: 0,
                                
                              }
                            }}
                            onDateChange={(date) => this.setState( { employeeData:{ ...this.state.employeeData, birthday: date } } ) }
                          />
                          
                        </Item>
                        <Item floatingLabel style={styles.formFieldHalf}>
                          <Label>E-Mail</Label>
                          <Input value={this.state.employeeData.email} onChangeText={ ( str ) => this.setState( { employeeData:{ ...this.state.employeeData, email: str } } ) } />
                        </Item>

                        <Item style={styles.formFieldHalfPicker}>
                          <Label>Zivilstand</Label>
                          <Picker
                            iosHeader="Select one"
                            style={styles.salutationPicker}
                            itemTextStyle={styles.salutationPickerText}
                            itemStyle={styles.salutationPickerText}
                            mode="dropdown"
                            selectedValue={this.state.employeeData.civil_status}
                            onValueChange={this.onMaritalStatusChange.bind(this)}>
                            <Item label="Ledig" value="ledig" />
                            <Item label="Verheiratet" value="verheiratet" />
                            <Item label="Geschieden" value="geschieden" />
                            <Item label="Verlobt" value="verlobt" />
                            <Item label="Verwitwet" value="verwitwet" />
                          </Picker>
                        </Item>

                        <Item floatingLabel style={styles.formFieldHalf}>
                          <Label>Anzahl Kinder</Label>
                          <Input value={this.state.employeeData.num_children} keyboardType={ (Platform.OS === "ios") ? 'number-pad' : 'numeric' } onChangeText={ ( str ) => this.setState( { employeeData:{ ...this.state.employeeData, num_children: str } } ) } />
                        </Item>

                        <Item style={styles.formFieldHalfPicker}>
                          <Label>Aufenthaltsbewilligung</Label>
                          <Picker
                            iosHeader="Select one"
                            style={styles.salutationPicker}
                            itemTextStyle={styles.salutationPickerText}
                            itemStyle={styles.salutationPickerText}
                            mode="dropdown"
                            selectedValue={this.state.employeeData.ch_permit}
                            onValueChange={this.onPermitChange.bind(this)}>
                            <Item label="Ausweis F" value="f" />
                            <Item label="Ausweis N" value="n" />
                            <Item label="Ausweis G" value="g" />
                            <Item label="Ausweis C" value="c" />
                            <Item label="Ausweis B" value="b" />
                            <Item label="Ausweis C EU/EFTA" value="c-eu" />
                            <Item label="Ausweis B EU/EFTA" value="b-eu" />
                          </Picker>
                        </Item>

                        <Item floatingLabel style={styles.formFieldHalf}>
                          <Label>Nationalität</Label>
                          <Input onChangeText={ ( str ) => this.setState( { employeeData:{ ...this.state.employeeData, nationality: str } } ) } />
                        </Item>
                        
                      </Form>
                    </View>
                    <View>
                        <Form style={styles.form}>

                          <Text style={styles.formFieldFull}>Bank Angaben</Text>

                          <Item floatingLabel style={styles.formFieldHalf}>
                            <Label>IBAN</Label>
                            <Input keyboardType={ (Platform.OS === "ios") ? 'number-pad' : 'numeric' } onChangeText={ ( str ) => this.setState( { employeeData:{ ...this.state.employeeData, iban: str } } ) } />
                          </Item>
                          <Item floatingLabel style={styles.formFieldHalf}>
                            <Label>Finanzinstitut</Label>
                            <Input onChangeText={ ( str ) => this.setState( { employeeData:{ ...this.state.employeeData, bank: str } } ) } />
                          </Item>
                          <Item floatingLabel style={styles.formFieldHalf}>
                            <Label>PLZ</Label>
                            <Input keyboardType={ (Platform.OS === "ios") ? 'number-pad' : 'numeric' } onChangeText={ ( str ) => this.setState( { employeeData:{ ...this.state.employeeData, bank_zip: str } } ) } />
                          </Item>
                          <Item floatingLabel style={styles.formFieldHalf}>
                            <Label>Ortschaft</Label>
                            <Input onChangeText={ ( str ) => this.setState( { employeeData:{ ...this.state.employeeData, bank_city: str } } ) } />
                          </Item>


                          <Text style={styles.formFieldFull}>Krankenkasse</Text>

                          <Item floatingLabel style={styles.formFieldHalf}>
                            <Label>Krankenkasse</Label>
                            <Input onChangeText={ ( str ) => this.setState( { employeeData:{ ...this.state.employeeData, healthInsurance: str } } ) } />
                          </Item>

                          <Item floatingLabel style={styles.formFieldHalf}>
                            <Label>Versicherten Nr.</Label>
                            <Input keyboardType={ (Platform.OS === "ios") ? 'number-pad' : 'numeric' } onChangeText={ ( str ) => this.setState( { employeeData:{ ...this.state.employeeData, healthInsurance_nr: str } } ) } />
                          </Item>

                          <Item floatingLabel style={styles.formFieldHalf}>
                            <Label>AHV</Label>
                            <Input keyboardType={ (Platform.OS === "ios") ? 'number-pad' : 'numeric' } onChangeText={ ( str ) => this.setState( { employeeData:{ ...this.state.employeeData, ahv: str } } ) } />
                          </Item>

                          
                          

                        </Form>
                    </View>
                    <View>
                        <Form style={styles.form}>
                          <Item floatingLabel style={styles.formFieldThird}>
                            <Label>Vertragsbeginn</Label>
                            <Input onChangeText={ ( str ) => this.setState( { employeeData:{ ...this.state.employeeData, contract_begin: str } } ) } />
                          </Item>
                          <Item floatingLabel style={styles.formFieldThird}>
                            <Label>Anstellungstyp</Label>
                            <Input onChangeText={ ( str ) => this.setState( { employeeData:{ ...this.state.employeeData, employment_type: str } } ) } />
                          </Item>
                          <Item floatingLabel style={styles.formFieldThird}>
                            <Label>Lohn</Label>
                            <Input onChangeText={ ( str ) => this.setState( { employeeData:{ ...this.state.employeeData, employment_salary: str } } ) } />
                          </Item>
                          <Item floatingLabel style={styles.formFieldHalf}>
                            <Label>Min. Stunden Monat</Label>
                            <Input keyboardType={ (Platform.OS === "ios") ? 'number-pad' : 'numeric' } onChangeText={ ( str ) => this.setState( { employeeData:{ ...this.state.employeeData, monthly_hours_min: str } } ) } />
                          </Item>
                          <Item floatingLabel style={styles.formFieldHalf}>
                            <Label>Max. Stunden Monat</Label>
                            <Input keyboardType={ (Platform.OS === "ios") ? 'number-pad' : 'numeric' } onChangeText={ ( str ) => this.setState( { employeeData:{ ...this.state.employeeData, monthly_hours_max: str } } ) } />
                          </Item>
                          <Item floatingLabel style={styles.formFieldHalf}>
                            <Label>Standort</Label>
                            <Input onChangeText={ ( str ) => this.setState( { employeeData:{ ...this.state.employeeData, location: str } } ) } />
                          </Item>
                          <Item floatingLabel style={styles.formFieldHalf}>
                            <Label>Aufgabenbereich</Label>
                            <Input onChangeText={ ( str ) => this.setState( { employeeData:{ ...this.state.employeeData, duty: str } } ) } />
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
  formFieldThirdPicker: {
    width: '30%',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  formFieldHalf: {
    width: '46%',
  },
  formFieldHalfPicker:{
    width: '46%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingTop: 16,
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
    
  },
  salutationPicker: {
    width:(Platform.OS === 'ios') ? undefined : 120,
    flexDirection: 'column',
    paddingLeft: 0,
  },
  salutationPickerText: {
    paddingLeft: 0,
  }

});


export default AdminDash;