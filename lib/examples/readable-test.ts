const p = Deno.run({
  cmd: ["kubectl", "get", "--raw", "/apis/coordination.k8s.io/v1/namespaces/kube-node-lease/leases?resourceVersion=0"],
  stdout: "piped",
  stderr: "inherit",
});
console.log(await p.output());

// const p = Deno.run({
//   cmd: ["ping", "8.8.8.8"],
//   stdout: "piped",
// });


// // https://github.com/denoland/deno/pull/8378
// export function readableStreamFromAsyncIterator<T>(
//   iterator: AsyncIterableIterator<T>,
//   cancel?: ReadableStreamErrorCallback,
// ): ReadableStream<T> {
//   return new ReadableStream({
//     cancel,
//     async pull(controller) {
//       const { value, done } = await iterator.next();

//       if (done) {
//         controller.close();
//       } else {
//         controller.enqueue(value);
//       }
//     },
//   });
// }

// export function readableStreamFromReaderCloser(
//   source: Deno.Reader & Deno.Closer,
//   options?: {
//     bufSize?: number;
//   },
// ): ReadableStream<Uint8Array> {
//   return readableStreamFromAsyncIterator(
//     Deno.iter(source, options),
//     () => source.close(),
//   );
// }

// for async

  // Convert Deno.Reader to standard stream
  // const rawStream = new ReadableStream({
  //   // TODO: consider a ByteStream, instead of a buffer object stream:
  //   type: 'bytes',
  //   autoAllocateChunkSize: 150,
  //   async pull(controller) {
  //     console.log(controller)
  //   //   const buf = new Uint8Array(4096);
  //   //   const bytes = await p.stdout.read(buf);
  //   //   if (bytes === null) {
  //   //     controller.close();
  //   //   } else {
  //   //     console.log('enqueue');
  //   //     controller.enqueue(buf.slice(0, bytes));
  //   //   }
  //   },
  //   // cancel(reason: string) {
  //   //   console.log('cancelling stream: '+reason)
  //   //   p.close();
  //   // },
  // }, {highWaterMark: 100});

//   const stdout = readableStreamFromAsyncIterator(Deno.iter(p.stdout, {bufSize: 64}), () => p.stdout.close());
//   for await (const b of readableStreamFromReaderCloser(p.stdout)) {
//     console.log(b);
//     break;
//   }

// console.log('done');
//   await new Promise(ok => setTimeout(ok, 10000))
