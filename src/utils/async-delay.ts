export async function asyncDelay(milliseconds: number, verbose = false) {
  if (milliseconds <= 0) return;
  if (verbose) {
    console.log(`Dalaying for ${milliseconds / 1000}s`);
  }
  return await new Promise((resolve) => setTimeout(resolve, milliseconds));
}
