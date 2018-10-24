import { injectable } from "inversify";

export interface IFeatureCheckerService {
  get(featureName: string): abp.features.IFeature;
  getValue(featureName: string): string;
  isEnabled(featureName: string): boolean;
}

@injectable()
export class FeatureCheckerService implements IFeatureCheckerService {
  get(featureName: string): abp.features.IFeature {
    return abp.features.get(featureName);
  }

  getValue(featureName: string): string {
    return abp.features.getValue(featureName);
  }

  isEnabled(featureName: string): boolean {
    return abp.features.isEnabled(featureName);
  }
}
