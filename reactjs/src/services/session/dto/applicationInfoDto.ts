export default class ApplicationInfoDto {
  version!: string;
  releaseDate!: Date;
  features: Feature[] = [];
}

class Feature {
  name!: string;
  included!: boolean;
}
