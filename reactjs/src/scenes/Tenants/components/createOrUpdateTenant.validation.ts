import { L } from '../../../lib/abpUtility';

const rules = {
  tenancyName: [{ required: true, message: L('ThisFieldIsRequired') }],
  name: [{ required: true, message: L('ThisFieldIsRequired') }],
  adminEmailAddress: [
    { required: true, message: L('ThisFieldIsRequired') },
    {
      type: 'email',
      message: 'The input is not valid E-mail!',
    }
  ],
};

export default rules;
