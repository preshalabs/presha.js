// core/DrizzleModel.ts

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import {
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
  integer,
  json
} from 'drizzle-orm/pg-core';
import { eq } from 'drizzle-orm';
import { PreshaModelInterface } from './PreshaModelInterface.js';

export type PreshaFieldType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'uuid'
  | 'timestamp'
  | 'json';

export interface PreshaField {
  type: PreshaFieldType;
  primary?: boolean;
  unique?: boolean;
  nullable?: boolean;
  default?: any;
}

export interface DrizzleModelSchema {
  name: string;
  fields: Record<string, PreshaField>;
}

// Database connection
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgresql://gliba:test@localhost:5432/test-app'
});

const db = drizzle(pool);

// Helper function to convert PreshaField to Drizzle column
function createDrizzleColumn(fieldName: string, field: PreshaField) {
  const isNullable = field.nullable !== false;

  switch (field.type) {
    case 'string':
      return text(fieldName).notNull();
    case 'number':
      return integer(fieldName).notNull();
    case 'boolean':
      return boolean(fieldName).notNull();
    case 'uuid':
      return uuid(fieldName).notNull();
    case 'timestamp':
      return timestamp(fieldName).notNull();
    case 'json':
      return json(fieldName).notNull();
    default:
      return text(fieldName).notNull();
  }
}

// MODEL SHOULD BE INTERFACE, so we can have like DrizzlePreshaModel, PrismaPreshaModel, SequelizePreshaModel, etc.

export class DrizzleModel<T> implements PreshaModelInterface<T> {
  name: string;
  fields: Record<string, PreshaField>;
  private table: any;

  constructor(schema: DrizzleModelSchema) {
    this.name = schema.name;
    this.fields = schema.fields;
    this.table = this.createTable();
  }

  private createTable() {
    const columns: Record<string, any> = {};

    // Add all fields as columns
    Object.entries(this.fields).forEach(([fieldName, field]) => {
      columns[fieldName] = createDrizzleColumn(fieldName, field);
    });

    return pgTable(this.name.toLowerCase(), columns);
  }

  getPrimaryKey(): string | undefined {
    return Object.entries(this.fields).find(([_, meta]) => meta.primary)?.[0];
  }

  getFieldNames(): string[] {
    return Object.keys(this.fields);
  }

  getFieldMetadata(field: string): PreshaField | undefined {
    return this.fields[field];
  }

  async create(data: any): Promise<any> {
    try {
      const result = await db.insert(this.table).values(data).returning();
      return (result as any[])[0];
    } catch (error) {
      console.error(`Error creating ${this.name}:`, error);
      throw error;
    }
  }

  async findById(id: string): Promise<any> {
    try {
      const primaryKey = this.getPrimaryKey();
      if (!primaryKey) {
        throw new Error('No primary key defined for this model');
      }

      const result = await db
        .select()
        .from(this.table)
        .where(eq(this.table[primaryKey], id));
      return result[0] || null;
    } catch (error) {
      console.error(`Error finding ${this.name} by id:`, error);
      throw error;
    }
  }

  async findAll(): Promise<any[]> {
    try {
      const result = await db.select().from(this.table);
      return result;
    } catch (error) {
      console.error(`Error finding all ${this.name}:`, error);
      throw error;
    }
  }

  async update(id: string, data: any): Promise<any> {
    try {
      const primaryKey = this.getPrimaryKey();
      if (!primaryKey) {
        throw new Error('No primary key defined for this model');
      }

      const result = await db
        .update(this.table)
        .set(data)
        .where(eq(this.table[primaryKey], id))
        .returning();

      return (result as any[])[0];
    } catch (error) {
      console.error(`Error updating ${this.name}:`, error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const primaryKey = this.getPrimaryKey();
      if (!primaryKey) {
        throw new Error('No primary key defined for this model');
      }

      await db.delete(this.table).where(eq(this.table[primaryKey], id));
    } catch (error) {
      console.error(`Error deleting ${this.name}:`, error);
      throw error;
    }
  }
}
