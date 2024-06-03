import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

// export const users = sqliteTable('users', {
//   id: integer('id').primaryKey({ autoIncrement: true }),
//   name: text('name').notNull(),
//   email: text('email').notNull().unique(),
//   password: text('password').notNull(),
//   githubId: text('github_id').unique(),
//   googleId: text('google_id').unique(),
//   avatar: text('avatar').notNull(),
//   createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
// })

export const tasks = sqliteTable('tasks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  // userId: integer('user_id').notNull(),
  title: text('title').notNull(),
  // description: text('description').notNull(),
  // dueDate: integer('due_date', { mode: 'timestamp' }).notNull(),
  completed: integer('completed').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});
