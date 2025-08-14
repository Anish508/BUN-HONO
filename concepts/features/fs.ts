import type {BunFile} from 'bun'

async function fileSystemOps() {
      const file : BunFile = Bun.file('foo.txt')
      console.log(file.size);
      const arrayBuffer = await file.arrayBuffer()
      const unint8array= await file.bytes()
      console.log(arrayBuffer);
      console.log(unint8array);
      
}
export {fileSystemOps}