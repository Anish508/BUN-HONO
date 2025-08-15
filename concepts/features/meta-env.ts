function importMetaAndEnv(){
      console.log(import.meta.url);
      console.log(import.meta.dir);
      console.log(import.meta.path);
      console.log(import.meta.main);
      
      console.log(process.env.NODE_ENV);
      console.log(Bun.env.NODE_ENV);
      
      
}

importMetaAndEnv()