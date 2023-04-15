import {StyleSheet, Dimensions} from 'react-native';


const height = Dimensions.get("screen").height
const width = Dimensions.get("screen").width

export default styles = StyleSheet.create({
    container: {
        borderWidth:2,
        borderColor:'#FF6F0050',
        backgroundColor:'#FF6F0008',
        borderRadius:10,
        margin:15,
        justifyContent:'center',
        alignItems:'center',
        width: width / 2.5,
        height: height / 4
    },

    title:{
        fontWeight:'bold',
        fontSize:25,
        color:'#FF6F00',

    }
})