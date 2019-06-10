import * as React from 'react';

import { L, isGranted } from '../../lib/abpUtility';

class AppComponentBase<P = {}, S = {}, SS = any> extends React.Component<P, S, SS> {
  L(key: string, sourceName?: string): string {
    return L(key);
  }

  isGranted(permissionName: string): boolean {
    return isGranted(permissionName);
  }
}

export default AppComponentBase;
