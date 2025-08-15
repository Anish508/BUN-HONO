async function hashPass() {

      const password = "super-secure-pa$$word";

      const hash = await Bun.password.hash(password,{
            algorithm:"argon2id",
            memoryCost:3,
            timeCost:3
      });
      console.log(hash);

      // => $argon2id$v=19$m=65536,t=2,p=1$tFq+9AVr1bfPxQdh6E8DQRhEXg/M/SqYCNu6gVdRRNs$GzJ8PuBi+K+BVojzPfS5mjnC8OpLGtv8KJqF99eP6a4

      const isMatch = await Bun.password.verify(password, hash);
      console.log(isMatch);

}
hashPass()