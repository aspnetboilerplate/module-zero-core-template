import { L } from 'src/lib/abpUtility';

const rules = {
  name: [{ required: true, message: L('ThisFieldIsRequired') }],
  displayName: [{ required: true, message: L('ThisFieldIsRequired') }],
  description: [{ required: true, message: L('ThisFieldIsRequired') }],
  isStatic: [{ required: true, message: L('ThisFieldIsRequired') }],
};

export default rules;
