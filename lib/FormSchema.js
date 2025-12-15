import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define the consultations table
export const consultations = pgTable("consultations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  service: text("service").notNull(),
  date: text("date"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Create insert schema for validations
export const insertConsultationSchema = createInsertSchema(consultations).omit({
  id: true,
  createdAt: true,
});
