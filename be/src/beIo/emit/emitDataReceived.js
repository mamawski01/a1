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

export async function emitDataReceivedConfirmUser(io, data) {
  try {
    io.emit("dataReceivedConfirmUser", data);
  } catch (err) {
    console.log(err);
    io.emit("dataReceivedConfirmUser", {
      errorOccurred: err,
    });
  }
}
