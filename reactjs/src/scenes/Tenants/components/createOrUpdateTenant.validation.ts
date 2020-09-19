import { L } from '../../../lib/abpUtility';

const rules = {
  tenancyName: [{ required: true, message: L('ThisFieldIsRequired') }],
  name: [{ required: true, message: L('ThisFieldIsRequired') }],
  adminEmailAddress: [
    {
      type: 'bool',
      message: 'The input is not valid E-mail!',
    },
    { required: true, message: L('ThisFieldIsRequired') }
  ],
};

export default rules;
