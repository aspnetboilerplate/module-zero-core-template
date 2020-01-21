import { L } from '../../../lib/abpUtility';

const rules = {
  name: [{ required: true, message: L('ThisFieldIsRequired') }],
  displayName: [{ required: true, message: L('ThisFieldIsRequired') }]
};

export default rules;
