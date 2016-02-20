//  mergeHashInto(hashA, hashB, hashC...)
// merge all properties from B, C into hash A.
const mergeHashInto = (dest, ...hashes) => {
  for (let i = 0; i < hashes.length; i++) {
    for (let k in hashes[i]) {
      dest[k] = hashes[i][k];
    }
  }
  return dest;
}

export  {mergeHashInto}
