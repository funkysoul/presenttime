import firebase from 'react-native-firebase';

export function logAnalyticsEvent(str, obj) {
	firebase.analytics().logEvent(str, obj);
}