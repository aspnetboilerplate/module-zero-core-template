class FeatureCheckerService {
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

export default FeatureCheckerService;
//newing class is making an Immediately Invoked Function Expression,
//so I can achieve Angular's Dependency Injection.
