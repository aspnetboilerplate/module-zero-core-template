import { L } from 'src/lib/abpUtility';

const rules = {
  userNameOrEmailAddress: [
    {
      required: true,
      message: L('ThisFieldIsRequired'),
    },
  ],
  password: [{ required: true, message: L('ThisFieldIsRequired') }],
};

export default rules;
