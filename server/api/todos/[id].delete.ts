export default eventHandler(async (event) => {
  const { id } = getRouterParams(event)

  const deletedTodo = await useDrizzle().delete(tables.tasks).where(and(
    eq(tables.tasks.id, Number(id))
  )).returning().get()

  if (!deletedTodo) {
    throw createError({
      statusCode: 404,
      message: 'Todo not found'
    })
  }
  return deletedTodo
})
