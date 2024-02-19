interface UnionProperty {
  type: 'union';
  value: string[];
}

interface LiteralProperty {
  type: 'literal';
  value: string;
}

interface ArrayProperty {
  type: 'array';
  value: string;
}

interface ObjectProperty {
  type: 'object';
  value: Record<string, unknown>;
}

interface StringProperty {
  type: 'string';
  value: 'string';
}

interface NumberProperty {
  type: 'number';
  value: 'number';
}

interface BooleanProperty {
  type: 'boolean';
  value: 'boolean';
}

interface UnknownProperty {
  type: 'unknown';
  value: 'unknown';
}

export type DocgenPropertyValue =
  | UnionProperty
  | LiteralProperty
  | ArrayProperty
  | ObjectProperty
  | StringProperty
  | NumberProperty
  | BooleanProperty
  | UnknownProperty;

export interface DocgenSource {
  examples: string[];
  description?: string;
  name: string;
  slug: string;
  properties: {
    name: string;
    description?: string;
    defaultValue?: string;
    value: DocgenPropertyValue;
  }[];
}

export interface DocgenSourceList {
  name: string;
  description?: string;
  _data: Map<string, DocgenSource>;
  sources: DocgenSource[];
  get(val: string): DocgenSource | undefined;
}
