export default eventHandler(async () => {
  const todos = await useDrizzle().select().from(tables.tasks).all()

  return todos
})
