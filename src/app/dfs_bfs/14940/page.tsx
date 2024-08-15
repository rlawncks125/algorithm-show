import React, { Suspense } from "react";

import Dfs from "./_components/Dfs";
import Bfs from "./_components/Bfs";
import { refineBy_14940 } from "./_utils/refine";

export default async function page() {
  const data = await fetch(`http://localhost:3000/dfs_bfs/14940/api`)
    .then((res) => res.json())
    .then((jsonData) => jsonData.data)
    .then(
      (data) => refineBy_14940(data) as { n: number; m: number; array: any }
    );

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {/* <DataRefine data={data} /> */}
        <h1>DFS 방식</h1>
        <Dfs {...data} />
      </Suspense>
      <Suspense>
        <h1>BFS 방식</h1>
        <Bfs {...data} />
      </Suspense>
    </div>
  );
}
