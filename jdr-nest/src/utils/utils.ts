import * as Mongoose from "mongoose";
import { ObjectId as m_ObjectId } from "mongodb";

export type Projection<K> = (keyof Partial<K>)[];

export type ObjectId = Mongoose.Types.ObjectId;
export const ObjectId = m_ObjectId;

export function projectionToSelect<K>(arr: Projection<K>) {
  return arr.reduce((acc, val) => ({...acc, [val]: 1 }), {})
}


export function flattenBody(body: Record<string, any>, preKey: string = ""): Record<string, string | number | boolean> {
  return Object.entries(body).reduce((acc, [ key, value ]) => {
    const keyName = buildKey(key, preKey)
    
    if (value === undefined) { return acc; }
    if (value === null) { return { ...acc, [keyName]: null }; }
    
    if (Array.isArray(value)) {
      return { ...acc, [keyName]: value };
    }
    if (typeof value === "object") {
      return { ...acc, ...flattenBody(value, keyName) };
    }
    return { ...acc, [keyName]: value };

  }, {})
  
  function buildKey(key: string, preKey?: string) {
    return `${preKey ? `${preKey}.${key}` : `${key}`}`
  }
}
