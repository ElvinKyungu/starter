export default eventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const { completed, title } = await readBody(event)

  const todo = await useDrizzle().update(tables.tasks).set({
    completed,
    title
  }).where(eq(tables.tasks.id, Number(id))).returning().get()

  return todo
})
