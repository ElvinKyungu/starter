export default defineTask({
  meta: {
    name: "db:seed",
    description: "Run database seed task",
  },
  async run() {
    console.log("Running DB seed task...")
    const seed = [
      {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        avatar: "https://example.com/avatar/john.png",
        createdAt: Date.now(),
      },
      {
        name: "Jane Doe",
        email: "jane@example.com",
        password: "password123",
        avatar: "https://example.com/avatar/jane.png",
        createdAt: Date.now(),
      },
    ]
    await useDrizzle().insert(tables.users).values(users);
    return { result: "success" }
  }
})
