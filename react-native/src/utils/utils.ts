import { Toast } from "native-base";


export const _toast=(message:string,type:any="danger")=>{
    Toast.show({
      text: message,
      duration: 2000,
      type:type
    })
  }
  