export enum FieldType{
    String=1,
    Number=2,
    Boolean=3,
    Date=4,
    DataRange=5,
    Enum=6
}
export enum CompareType{
    Greater =1,
    Equal=2,
    Less=3,
    GreaterOrEqual=4,
    LessOrEqual=5,
    Contains=6,
    StartWith=7,
    EndWith=8,
    NotEqual=9
}
export  class Filter{
    Type:FieldType;
    Value:any;
    FieldName:string;
    CompareType:CompareType;
}