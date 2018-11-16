import { EntityDto } from "src/services/dto/entityDto";



export default interface BaseStore<T>  {

  get: (entityDto:EntityDto) => T;
}
