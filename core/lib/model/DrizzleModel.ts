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
import { PreshaField, PreshaModelSchema } from '../types/PreshaSchema';

// Database connection
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgresql://gliba:test@localhost:5432/test-app'
});

const db = drizzle(pool);

// Helper function to convert PreshaField to Drizzle column
function createDrizzleColumn(fieldName: string, field: PreshaField) {
  // const isNullable = field.nullable !== false;

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

// TODO: Need to introduce ts type for each model in order to get rid of any type, and accomplish full type safety.
// Possible solutions:
// based on schema

export class DrizzleModel<T> implements PreshaModelInterface<T> {
  name: string;
  fields: Record<string, PreshaField>;
  private table: any;

  constructor(schema: PreshaModelSchema) {
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
    return Object.entries(this.fields).find(([, meta]) => meta.primary)?.[0];
  }

  getFieldNames(): string[] {
    return Object.keys(this.fields);
  }

  getFieldMetadata(field: string): PreshaField | undefined {
    return this.fields[field];
  }

  async create(data: Partial<T>): Promise<T> {
    try {
      const result = await db.insert(this.table).values(data).returning();
      return result[0];
    } catch (error) {
      console.error(`Error creating ${this.name}:`, error);
      throw error;
    }
  }

  async findById(id: string): Promise<T | null> {
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

  async findAll(): Promise<T[]> {
    try {
      const result = await db.select().from(this.table);
      return result;
    } catch (error) {
      console.error(`Error finding all ${this.name}:`, error);
      throw error;
    }
  }

  async update(id: string, data: Partial<T>): Promise<T> {
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

      return result[0];
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
