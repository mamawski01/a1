export async function emitDataReceived(io, data) {
  try {
    io.emit("dataReceived", data);
  } catch (err) {
    console.log(err);
    io.emit("dataReceived", {
      errorOccurred: err,
    });
  }
}
