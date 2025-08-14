/* const data = `It was the best of times, it was the worst of times.`;
await Bun.write("output.txt", data);
 */

/* const input = Bun.file("input.txt");
const output = Bun.file("output.txt"); // doesn't exist yet!
await Bun.write(output, input); */


/* await Bun.file('output.txt').delete() */

/* const file = Bun.file("output.txt");
const writer = file.writer();

writer.write("it was the best of times\n");
writer.write("it was the worst of times\n");
writer.write("Its gonna be the happiest day") */


import { readdir } from "node:fs/promises";

// read all the files in the current directory
const files = await readdir(import.meta.dir);
console.log(files);
