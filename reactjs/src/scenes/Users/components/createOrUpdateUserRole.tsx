import * as  React from "react";
import { Checkbox, } from "antd";
import FormItem from "antd/lib/form/FormItem";


class CreateOrUpdateUserRole extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }

  setUserRole = (field: any) => (e: any) => {
    
  };

  render() {
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 1
        }
      }
    };
 

          return (
            <FormItem {...tailFormItemLayout} style={{ marginBottom: -10 }}>
              <Checkbox
               
              >
                {"item.roleDisplayName"}
              </Checkbox>
            </FormItem>
         
      
    );
  }
}

export default CreateOrUpdateUserRole;
