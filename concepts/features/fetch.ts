async function fetchDemo() {
      const response = await fetch("https://dummyjson.com/test/1")
            const data = await response.json()
            console.log(data);
            
      
}
fetchDemo()