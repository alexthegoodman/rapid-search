/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
     */
    json<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "JSONObject";
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
     */
    json<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "JSONObject";
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
  JSONObject: any
}

export interface NexusGenObjects {
  Interest: { // root type
    generatedInterestSlug?: string | null; // String
    id?: string | null; // String
    name?: string | null; // String
  }
  Link: { // root type
    description?: string | null; // String
    title?: string | null; // String
    url?: string | null; // String
  }
  Query: {};
  SearchData: { // root type
    contextKeywords?: Array<string | null> | null; // [String]
    keywords?: Array<string | null> | null; // [String]
    results?: Array<NexusGenRootTypes['SearchResult'] | null> | null; // [SearchResult]
  }
  SearchResult: { // root type
    excerpt?: string | null; // String
    headline?: string | null; // String
    id?: string | null; // String
    loadSpeedScore?: number | null; // Int
    metaDescription?: string | null; // String
    metaTitle?: string | null; // String
    summary?: string | null; // String
    topicScore?: number | null; // Float
    url?: string | null; // String
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Interest: { // field return type
    generatedInterestSlug: string | null; // String
    id: string | null; // String
    name: string | null; // String
  }
  Link: { // field return type
    description: string | null; // String
    title: string | null; // String
    url: string | null; // String
  }
  Query: { // field return type
    search: NexusGenRootTypes['SearchData'] | null; // SearchData
  }
  SearchData: { // field return type
    contextKeywords: Array<string | null> | null; // [String]
    keywords: Array<string | null> | null; // [String]
    results: Array<NexusGenRootTypes['SearchResult'] | null> | null; // [SearchResult]
  }
  SearchResult: { // field return type
    excerpt: string | null; // String
    headline: string | null; // String
    id: string | null; // String
    loadSpeedScore: number | null; // Int
    metaDescription: string | null; // String
    metaTitle: string | null; // String
    summary: string | null; // String
    topicClassification: NexusGenRootTypes['Interest'] | null; // Interest
    topicScore: number | null; // Float
    url: string | null; // String
  }
}

export interface NexusGenFieldTypeNames {
  Interest: { // field return type name
    generatedInterestSlug: 'String'
    id: 'String'
    name: 'String'
  }
  Link: { // field return type name
    description: 'String'
    title: 'String'
    url: 'String'
  }
  Query: { // field return type name
    search: 'SearchData'
  }
  SearchData: { // field return type name
    contextKeywords: 'String'
    keywords: 'String'
    results: 'SearchResult'
  }
  SearchResult: { // field return type name
    excerpt: 'String'
    headline: 'String'
    id: 'String'
    loadSpeedScore: 'Int'
    metaDescription: 'String'
    metaTitle: 'String'
    summary: 'String'
    topicClassification: 'Interest'
    topicScore: 'Float'
    url: 'String'
  }
}

export interface NexusGenArgTypes {
  Query: {
    search: { // args
      contextQuery: string; // String!
      query: string; // String!
      topicClassificationSlug?: string | null; // String
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}