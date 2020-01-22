import { Modal, View, TouchableOpacity,Text, TextInput,StyleSheet, Dimensions } from "react-native";
import React from "react";
import { Button, Icon } from "native-base";

export interface TenantModalProps {
    loading: boolean;
    toggleModal:()=>void;
    isTenantAvaible:(tenantName:string)=>void
  }
  
  export const TenantModal = (props: TenantModalProps) => {
    const { loading,toggleModal,isTenantAvaible } = props;
    return (
      <Modal
        transparent={true}
        animationType={'fade'}
        visible={loading}
        onRequestClose={() => { console.log('close modal') }}>
        <View style={styles.modalBackground}>
          <View style={styles.card}>
            <TouchableOpacity onPress={() => toggleModal()} style={{ position: "absolute", right: -10, top: -10 }} >
              <Icon type="AntDesign" name="closecircle" style={{ fontSize: 30 }}></Icon>
            </TouchableOpacity>
            <TextInput style={styles.inputs}
             onSubmitEditing={()=>isTenantAvaible(this.tenantName._lastNativeText)}
              placeholder="Tenant Name"
              keyboardType="default"
              underlineColorAndroid='transparent'
              ref={(ref:any) => { this.tenantName = ref }}
               />
            <Button  warning style={styles.button} onPress={() => isTenantAvaible(this.tenantName._lastNativeText)}>
              <Text style={styles.buttonText} >Tenant Değiştir</Text>
            </Button>
          </View>
        </View>
      </Modal>
    )
  }


  const styles = StyleSheet.create({
    
    tenantText: {
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      borderBottomColor: "#DCDCDC",
      borderBottomWidth: 2,
      height: 60
    },
    modalBackground: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',
      backgroundColor: 'rgba(191, 191, 191, 0.5)'
    },
    card: {
        backgroundColor: "white",
        marginLeft: 30,
        marginRight: 30,
        shadowColor: "#000",
        padding: 20,
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        borderRadius: 12,
        width: Math.round(Dimensions.get('window').width - 60),
    
      },
      inputs: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#DCDCDC',
        borderRadius: 12,
        marginTop: 20,
        height: 40,
        paddingLeft: 10,
    
      },
      button: {
        height: 40,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 30,
      },
      buttonText: {
        color: "white",
        fontSize: 14
      },
  
  });
  