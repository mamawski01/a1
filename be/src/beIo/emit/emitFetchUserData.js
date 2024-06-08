export async function emitMessageReceived(io, data) {
  try {
    io.emit("messageReceived", data);
  } catch (err) {
    console.log(err);
    io.emit("messageReceived", {
      errorOccurred: err,
    });
  }
}
