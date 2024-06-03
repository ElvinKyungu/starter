export default eventHandler(async (event) => {
  const { title } = await readBody(event)

  const todo = await useDrizzle().insert(tables.tasks).values({
    title,
    // description,
    // completed,
    // dueDate,
    createdAt: new Date()
  }).returning().get()

  return todo
})
