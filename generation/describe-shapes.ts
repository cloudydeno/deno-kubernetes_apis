import { OpenAPI2SchemaObject, GroupVersionKind } from "./openapi.ts";

export class ShapeLibrary {
  availableNames: Record<string, OpenAPI2SchemaObject | undefined>;
  localApi: string;
  constructor(availableNames: Record<string, OpenAPI2SchemaObject>, apiGroup: string, apiVersion: string) {
    this.availableNames = availableNames;

    this.localApi = '';
    if (apiGroup === 'meta') {
      this.localApi = `io.k8s.apimachinery.pkg.apis.meta.${apiVersion}.`;
    }
    for (const [path, schema] of Object.entries(availableNames)) {
      const kinds = schema["x-kubernetes-group-version-kind"]
      if (!kinds || kinds.length !== 1) continue;
      const [kind] = kinds;
      if (kind.group !== apiGroup) continue;
      if (kind.version !== apiVersion) continue;
      if (!path.endsWith(kind.kind)) continue;
      this.localApi = path.slice(0, -kind.kind.length);
      break;
    }
    if (!this.localApi) throw new Error(
      `Failed to find API path for ${apiGroup} ${apiVersion}`);

    for (const [path, schema] of Object.entries(availableNames)) {
      if (path.startsWith(this.localApi) && schema.type === 'object') {
        // console.log(path);
        this.readSchema({$ref: `#/definitions/${path}`})
      }
    }
  }

  shapes = new Map<string,ApiShape>();
  localShapes = new Map<string, ApiShape>();
  remoteShapes = new Map<string, ApiShape>();

  readSchema(schema: OpenAPI2SchemaObject): ApiShape {
    if (schema.$ref) {
      let shape = this.shapes.get(schema.$ref);
      if (!shape) {
        shape = this.resolveRef(schema);
        this.shapes.set(schema.$ref, shape);
      }
      return shape;

    } else if (schema.properties) {
      if (schema.additionalProperties) throw new Error(`TODO: complex obj`)
      const fields = new Map<string,ApiShape>();
      for (const [key, val] of Object.entries(schema.properties)) {
        // console.log(key, JSON.stringify(val))
        fields.set(key, this.readSchema(val));
      }
      // if (schema.description?.includes('lists and various')) throw new Error('todo')
      return {
        type: 'structure',
        description: schema.description,
        required: schema.required ?? [],
        fields,
      };

    } else if (schema.type === 'array' && schema.items) {
      return {
        type: 'list',
        description: schema.description,
        inner: this.readSchema(schema.items),
      };

    } else if (schema.type === 'object' && typeof schema.additionalProperties === 'object') {
      return {
        type: 'map',
        description: schema.description,
        inner: this.readSchema(schema.additionalProperties),
      };

    } else if (schema.type === 'object') {
      console.log('WARN: found empty object');
      return {
        type: 'structure',
        description: schema.description,
        required: [],
        fields: new Map,
      };

    } else if (schema.type === 'string') {
      return {
        type: 'string',
        format: schema.format,
        enum: schema.enum,
        description: schema.description,
      };

    } else if (schema.type === 'integer') {
      return {
        type: 'number',
        format: schema.format,
        description: schema.description,
      };

    } else if (schema.type === 'boolean') {
      return {
        type: 'boolean',
        description: schema.description,
      };

    } else if (schema['x-kubernetes-int-or-string']) {
      return {
        type: 'string',
        format: 'int-or-string',
        description: schema.description,
      };

    } else if (schema['x-kubernetes-preserve-unknown-fields']) {
      return {
        type: 'any',
        description: schema.description,
      };

    }
    console.log('TODO', schema);
    throw new Error(`TODO`);
  }

  resolveRef(schema: OpenAPI2SchemaObject): ApiShape {
    const prefix = '#/definitions/';
    if (!schema.$ref.startsWith(prefix)) {
      console.log('TODO', schema);
      throw new Error(`TODO resolveSchema ${schema.$ref}`);
    }

    const defId = schema.$ref.slice(prefix.length);
    const definition = this.availableNames[defId];
    if (!definition) throw new Error(`Def ${defId} not found`);
    const shape = this.readSchema(definition);
    shape.reference = defId;

    const isLocal = defId.startsWith(this.localApi);
    (isLocal ? this.localShapes : this.remoteShapes).set(defId, shape);

    const kinds = definition["x-kubernetes-group-version-kind"]
    if (kinds?.length === 1) {
      const [kind] = kinds;
      shape.kind = kind;
    }

    return shape;
  }
}
// export class ApiShape {}

export type ApiShape =
| AnyShape
| BooleanShape
| PrimitiveShape
| WrapperShape
| StructureShape
;

export interface ShapeMeta {
  reference?: string;
  description?: string;
  kind?: GroupVersionKind;
}

export interface AnyShape extends ShapeMeta {
  type: 'any';
}

export interface BooleanShape extends ShapeMeta {
  type: 'boolean';
}

export interface PrimitiveShape extends ShapeMeta {
  type: 'string' | "number";
  format?: "byte" | "date-time" | "double" | "int32" | "int64" | "int-or-string";
  enum?: string[];
}

export interface WrapperShape extends ShapeMeta {
  type: 'list' | 'map';
  inner: ApiShape;
}

export interface StructureShape extends ShapeMeta {
  type: 'structure';
  required: string[];
  fields: Map<string,ApiShape>;
}
