import {StyleSheet} from 'react-native';


export default styles = StyleSheet.create({
    
    body: {
        backgroundColor:"white",
        flex:1,
    },
    header: {
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center',
        padding:10,
        paddingBottom:0,
        // selam, bana ulaş!
    },
    welcome: {
        fontSize:30,
        fontWeight:'bold',
        color:'#FF6F00',
    },
    user: {
        color: "orange",
        fontWeight: "900",
        
    },

    flatlist: {
        borderTopWidth:2,
        borderTopColor:'#FF6F0010',
        marginTop:8,
        paddingTop:5
    },

    buttonContainer: {
        backgroundColor:'#FF6F00',
    }
})