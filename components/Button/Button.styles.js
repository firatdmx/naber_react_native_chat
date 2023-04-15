import {StyleSheet} from 'react-native';

const base_style = StyleSheet.create({
    pressable: {
        padding:15,
        margin:12,
        borderRadius:10,
        flexDirection:"row",
        justifyContent:'flex-end',
        alignItems:'flex-start'
    },
    font: {
        fontSize:25,
        fontWeight:'900',
    },
    
    view: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default styles = StyleSheet.create({
    primary: {
        pressable:{
            ...base_style.pressable,
            backgroundColor: "#fff3",
        },
        font:{
            ...base_style.font,
            color:"white"
        },
        view: {
            ...base_style.view,
        }

    },
    secondary: {
        pressable:{
            ...base_style.pressable,
            backgroundColor: "white",
        },
        font: {
            ...base_style.font,
            color:"#FF6F00"
        },
        view: {
            ...base_style.view,
        }
    }
})