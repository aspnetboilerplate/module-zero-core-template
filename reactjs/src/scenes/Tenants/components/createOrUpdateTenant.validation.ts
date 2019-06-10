import { L } from '../../../lib/abpUtility';

const rules = {
  tenancyName: [{ required: true, message: L('ThisFieldIsRequired') }],
  name: [{ required: true, message: L('ThisFieldIsRequired') }],
  adminEmailAddress: [{ type: 'email', required: true, message: L('ThisFieldIsRequired') }],
};

export default rules;
